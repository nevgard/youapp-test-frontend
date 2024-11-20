import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { getHoroscope, getZodiac } from "@/lib/zodiac";

export default function EditAboutForm({ saveUpdate, setFormData, formData }) {
  const [uploadedImage, setUploadedImage] = useState(null);

  // Load image from localStorage on component mount
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setUploadedImage(storedImage);
      setFormData((prevData) => ({
        ...prevData,
        profileImage: storedImage,
      }));
    }
  }, [setFormData]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result;
        setUploadedImage(imageBase64); 
        setFormData((prevData) => ({
          ...prevData,
          profileImage: imageBase64,
        }));
        localStorage.setItem("profileImage", imageBase64); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "height" || name === "weight" ? Number(value) : value,
    }));
  };

  const handleBirthdayChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      birthday: date,
      horoscope: getHoroscope(date),
      zodiac: getZodiac(date),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Data:", {
      ...formData,
      birthday: formData.birthday
        ? dayjs(formData.birthday).format("DD/MM/YYYY")
        : "",
    });
  };

  return (
    <div className="mt-6 p-2">
      <div className="flex items-center space-x-4">
        <div className={`rounded-xl bg-secondary ${uploadedImage ? "" : "p-5"}`}>
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-16 h-16 rounded-xl object-cover"
            />
          ) : (
            <img src="Union.png" alt="Placeholder" className="w-5" />
          )}
        </div>
        <label
          htmlFor="upload-image"
          className="cursor-pointer text-white underline"
        >
          {uploadedImage ? "Change Image" : "Add Image"}
        </label>
        <input
          type="file"
          id="upload-image"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-8">
        {/* Display Name */}
        <InputField
          label="Display name:"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />

        {/* Gender */}
        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="gender" className="text-accent w-[40%] text-sm">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="bg-secondary text-white w-[40%] text-sm border border-accent rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Birthday */}
        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="birthday" className="text-accent w-[40%] text-sm">
            Birthday:
          </label>
          <DatePicker
            selected={formData.birthday}
            onChange={handleBirthdayChange}
            dateFormat="dd/MM/yyyy"
            className="bg-secondary text-white text-sm border border-accent rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            placeholderText="DD/MM/YYYY"
          />
        </div>

        {/* Horoscope */}
        <ReadonlyField label="Horoscope:" value={formData.horoscope} />

        {/* Zodiac */}
        <ReadonlyField label="Zodiac:" value={formData.zodiac} />

        {/* Height */}
        <InputField
          label="Height:"
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Enter height"
          inputMode="numeric"
        />

        {/* Weight */}
        <InputField
          label="Weight:"
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Enter weight"
          inputMode="numeric"
        />
      </form>
    </div>
  );
}

function InputField({ label, type, name, value, onChange, placeholder, inputMode }) {
  return (
    <div className="mb-4 flex justify-between items-center">
      <label htmlFor={name} className="text-accent w-[40%] text-sm">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        className="bg-secondary text-white w-[40%] text-sm border border-accent rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
      />
    </div>
  );
}

function ReadonlyField({ label, value }) {
  return (
    <div className="mb-4 flex justify-between items-center">
      <label className="text-accent w-[40%] text-sm">{label}</label>
      <p className="bg-secondary text-white w-[40%] text-sm border border-accent rounded-md p-2 flex-1 text-right">
        {value || "--"}
      </p>
    </div>
  );
}
