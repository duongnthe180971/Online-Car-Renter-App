using System.Text.Json;
using System.Text.Json.Serialization;

namespace CarRentalAPI
{
    public class JsonStringToBoolConverter : JsonConverter<bool>
    {
        public override bool Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String)
            {
                var val = reader.GetString();
                return val == "1" || val?.ToLower() == "true";
            }
            if (reader.TokenType == JsonTokenType.Number) return reader.GetInt32() == 1;
            return reader.TokenType == JsonTokenType.True;
        }
        public override void Write(Utf8JsonWriter writer, bool value, JsonSerializerOptions options) => writer.WriteBooleanValue(value);
    }
}
