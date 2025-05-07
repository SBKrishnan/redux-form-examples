import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setError,
  setMessage,
  setName,
  setPhone,
} from "../../redux/formSlice";
import { z } from "zod";
const ContactForm = () => {
  const { name, email, gender, message, phone, error } = useSelector(
    (state) => state.form
  );
  const dispatch = useDispatch();

  const contactFormSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    phone: z
      .string()
      .min(10, { message: " Phone number must be at least 10 digits" }),
    message: z
      .string()
      .min(5, { message: "Message must be at least 5 characters" }),
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(true);
    const result = contactFormSchema.safeParse({
      name,
      email,
      phone,
      message,
    });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      dispatch(setError(errorMessages));
      return;
    }
  };

  const fieldErrors = error || {};

  console.log(fieldErrors);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Contact form</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            id="name"
            type="text"
            className="form-control"
          />
          {fieldErrors.name && (
            <p style={{ color: "red" }}>{fieldErrors.name}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            type="email"
            id="email"
            className="form-control"
          />
          {fieldErrors.email && (
            <p style={{ color: "red" }}>{fieldErrors.email}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            value={phone}
            onChange={(e) => dispatch(setPhone(e.target.value))}
            type="tel"
            id="phone"
            className="form-control"
          />
          {fieldErrors.phone && (
            <p style={{ color: "red" }}>{fieldErrors.phone}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="msg" className="form-label">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => dispatch(setMessage(e.target.value))}
            id="message"
            className="form-control"
          />
          {fieldErrors.message && (
            <p style={{ color: "red" }}>{fieldErrors.message}</p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      {showForm && (
        <div className="mb-5">
          <h1>Details</h1>
          <h2>Name:{name}</h2>
          <h3>Email:{email}</h3>
          <h3>gender:{gender}</h3>
          <h3>Phone:{phone}</h3>
          <h2>Message:{message}</h2>
        </div>
      )}
    </>
  );
};
export default ContactForm;
