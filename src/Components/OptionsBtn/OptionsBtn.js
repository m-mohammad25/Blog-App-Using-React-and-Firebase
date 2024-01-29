import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function OptionsBtn(props) {
  const [isOptionsBtnClicked, setIsOptonsBtnClicked] = useState(false);

  return (
    <>
      <div className="options-btn">
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="icon"
          onClick={() => setIsOptonsBtnClicked((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
        {isOptionsBtnClicked && (
          <div className="options-menu">
            <div className="option delete-btn" onClick={() => props.onDelete()}>
              <FontAwesomeIcon icon={faTrash} className="icon" />
              Delete
            </div>
            <hr />
            <div className="option" onClick={() => props.onUpdate()}>
              <FontAwesomeIcon icon={faPenToSquare} className="icon" />
              Update
            </div>
          </div>
        )}
      </div>
    </>
  );
}
