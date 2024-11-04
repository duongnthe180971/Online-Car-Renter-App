import React, { useState, useEffect } from "react";
import axios from "axios";
import ChooseBar from "../../modules/components/ChooseBarAdmin";
import Loader from "../../modules/components/Loader";
import "../../styles/admin/AdminVoucher.css";

const AdminVouchers = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/voucher");
      setVouchers(response.data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const createVoucher = async () => {
    const formData = new FormData();
    formData.append("code", code);
    formData.append("discountPercentage", discount);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/voucher", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCode("");
      setDiscount("");
      setImage(null);
      setImagePreview("");
      fetchVouchers();
    } catch (error) {
      console.error("Error creating voucher:", error);
    }
  };

  const deleteVoucher = async (voucherId) => {
    try {
      await axios.delete(`http://localhost:5000/api/voucher/${voucherId}`);
      setVouchers(
        vouchers.filter((voucher) => voucher.VoucherID !== voucherId)
      );
      alert("Voucher deleted successfully");
    } catch (error) {
      console.error("Error deleting voucher:", error);
    }
  };

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <div className="Bar">
          <ChooseBar />
        </div>
      </div>

      <div className="RightSide">
        <div className="admin-vouchers">
          {loading ? (
            <Loader /> // Show Loader while data is being fetched
          ) : (
            <>
              <h2>Create Voucher</h2>
              <div className="voucher-inputs">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Code"
                />
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Discount %"
                />
                <input type="file" onChange={handleImageChange} />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="voucher-image-preview"
                  />
                )}
                <button onClick={createVoucher}>Create Voucher</button>
              </div>
              <h2>Existing Vouchers</h2>
              <div className="existing-vouchers">
                <ul>
                  {vouchers.length > 0 ? (
                    vouchers.map((voucher) => (
                      <li key={voucher.VoucherID}>
                        <span>
                          {voucher.VoucherCode} - {voucher.DiscountAmount}%
                        </span>
                        {voucher.image && (
                          <img
                            src={voucher.image}
                            alt="Voucher"
                            height="150"
                            width="200"
                            onError={(e) =>
                              (e.target.src = "/default-image.jpg")
                            }
                            className="voucher-image"
                          />
                        )}
                        <button
                          onClick={() => deleteVoucher(voucher.VoucherID)}
                        >
                          Delete
                        </button>
                      </li>
                    ))
                  ) : (
                    <p>No vouchers available</p>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminVouchers;
