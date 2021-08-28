import axios from "axios";
import { useEffect, useState } from "react";

const ImagesCompare = () => {
  const [data, setData] = useState();
  const [compareImgArray, setCompareImgArray] = useState([]);

  const handleCompare = (e, image) => {
    const tempImg = data.find((img) => img.id == e.target.id);
    if (image.addCompare) {
      setCompareImgArray([...compareImgArray, tempImg]);

      let updatedList = data.map((images) => {
        if (images.id == e.target.id) return { ...images, addCompare: false };
        else {
          return images;
        }
      });
      setData(updatedList);
    } else {
      let updatedList = compareImgArray.filter((images) => images.id != e.target.id);
      setCompareImgArray(updatedList);

      let removeUpdatedList = data.map((images) => {
        if (images.id == e.target.id) return { ...images, addCompare: true };
        else {
          return images;
        }
      });
      setData(removeUpdatedList);
    }
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos/")
      .then((response) => {
        let updatedList = response.data.map((images) => {
          return { ...images, addCompare: true };
        });
        //console.log(response.data);
        setData(updatedList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th className="text-center" colSpan="4">
                COMPARISON TABLE
              </th>
            </tr>
            <tr>
              <th>Photo</th>
              <th>ID</th>
              <th>URL</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {compareImgArray?.map((images) => {
              return (
                <tr>
                  <td>Photo {images.id}</td>
                  <td>{images.id}</td>
                  <td>{images.url}</td>
                  <td>{images.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="row">
        {data &&
          data.map((image) => {
            return (
              <div className="col-3 mb-3" key={image.id}>
                <div className="card">
                  <img src={image.url} alt={image.title} loading="lazy" />
                  <p>
                    <span>Title:</span>
                    {image.title}
                  </p>
                  <p>
                    <span>ID:</span>
                    {image.id}
                  </p>
                  <p>
                    <span>URL:</span>
                    {image.url}
                  </p>
                  <button
                    className={image.addCompare ? "btn-compare" : "btn-remove"}
                    id={image.id}
                    onClick={(e) => handleCompare(e, image)}
                  >
                    {image.addCompare ? "Compare" : "Remove"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default ImagesCompare;
