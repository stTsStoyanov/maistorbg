import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import userManager from "../../model/managers/userManager";
import jobAdvertisement from "../../model/classes/jobAdvertisement";
import { useNavigate } from "react-router-dom";
import "./createJobAdvertisementForm.scss";

const CreateJobAdvertisementForm = () => {
  const [jobAdvertisementTitle, setJobAdvertisementTitle] = useState("");
  const [jobAdvertisementText, setJobAdvertisementText] = useState("");
  const [jobAdvertisementImages, setJobAdvertisementImages] = useState([]);
  const [category, setCategory] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertText, setAlertText] = useState("");
  const navigate = useNavigate();
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const defaultImageUrl = "https://www.hercjobs.org/wp-content/uploads/2020/07/Is-now-a-good-time-to-look-for-a-job-HERC.jpg";

  let categories = JSON.parse(localStorage.getItem("craftsmenCategories")).map(
    (item) => item.category
  );
  const allCategories = categories;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobAdvertisementTitle || !jobAdvertisementText || !category) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertText("Моля, попълнете всички задължителни полета.");
      return;
    }
    if (jobAdvertisementText.length < 25) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertText("Описанието на офертата трябва да бъде поне 25 символа.");
      return;
    }
    userManager.getLoggedUser().then((user) => {
      const authorId = user.id;
      const imagesToUse = jobAdvertisementImages.length === 0 ? [defaultImageUrl] : jobAdvertisementImages;
      const newJobAdvertisement = new jobAdvertisement(
        jobAdvertisementTitle,
        jobAdvertisementText,
        imagesToUse,
        authorId,
        category
      );
      let jobAdvertisements = JSON.parse(
        localStorage.getItem("allJobAdvertisements")
      );
      jobAdvertisements.push(newJobAdvertisement);
      localStorage.setItem(
        "allJobAdvertisements",
        JSON.stringify(jobAdvertisements)
      );
      setShowAlert(true);
      setAlertVariant("success");
      setAlertText("Офертата Ви беше създадена!");
      setJobAdvertisementTitle("");
      setJobAdvertisementText("");
      setJobAdvertisementImages([]);
      setCategory("");
      setTimeout(() => {
        navigate("/home/myprofile/user");
      }, 900);
    });
  };

  const handleImageUpload = (e) => {
    let files = Array.from(e.target.files);
    const allFilesAreImages = files.every((file) =>
      file.type.startsWith("image/")
    );
  
    if (!allFilesAreImages) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertText("Моля, качете само снимки.");
      setDisableSubmitButton(true);
      return;
    } else {
      setDisableSubmitButton(false);
    }
  
    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });
    Promise.all(imagePromises).then((base64Images) => {
      setJobAdvertisementImages((prevImages) => prevImages.concat(base64Images));
    });
  };
  const removeImage = (index) => {
    setJobAdvertisementImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="d-flex justify-content-center, containerJob">
      <Form onSubmit={handleSubmit} style={{ width: "30%" }}>
      <h1 className="text-center">Създайте оферта</h1>
        <Form.Group controlId="formJobTitle">
          <Form.Label>
            Заглавие на обявата<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Въведете заглавие на обявата"
            value={jobAdvertisementTitle}
            onChange={(e) => setJobAdvertisementTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formJobText">
          <Form.Label>
            Описание на самата работа<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Въведете описание на обявата"
            value={jobAdvertisementText}
            onChange={(e) => setJobAdvertisementText(e.target.value)}
          />
        </Form.Group>
                <Form.Group controlId="formJobImages">
  <Form.Label>Снимки на офертата</Form.Label>
  <Form.Control
    id="custom-file"
    label="Избери снимки"
    type="file"
    multiple
    onChange={handleImageUpload}
  />
  <div className="uploaded-images mt-3">
    {jobAdvertisementImages.map((image, index) => (
      <div key={index} className="uploaded-image-container mr-2 mb-2">
        <img
          src={image}
          alt="uploaded"
          className="uploaded-image"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <button
          type="button"
          className="btn btn-danger btn-sm remove-image-btn"
          onClick={() => removeImage(index)}
        >
          X
        </button>
      </div>
    ))}
  </div>
</Form.Group>
                <Form.Label>Категории<span className="text-danger">*</span></Form.Label>
              <Form.Control
               as="select"
               value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mr-3"
              style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath d='M0 2.531l3 3 3-3h-6zm0-2.531h6v2h-6v-2z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              backgroundSize: '16px 16px',
            }}
            > 
    <option value="" disabled>
        Изберете категория
    </option>
    {allCategories.map((category, index) => (
        <option key={index} value={category}>
            {category}
        </option>
    ))}
              </Form.Control>
                {showAlert && <Alert variant={alertVariant}>{alertText}</Alert>}
                <Button variant="primary" type="submit" disabled={disableSubmitButton}>
  Създайте обявата
</Button>
            </Form>
        </div>
    );
};

export default CreateJobAdvertisementForm;
