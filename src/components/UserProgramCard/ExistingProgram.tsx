import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdjustIcon from "../../assets/adjustIcon.svg";

interface ExistingProgramProps {
  dietProgram: string;
}

const ExistingProgram: FC<ExistingProgramProps> = ({ dietProgram }) => {
  const [userDietProgram, setUserDietProgram] = useState<string>();

  useEffect(() => {
    function handleDietProgram() {
      switch (dietProgram) {
        case "maintence":
          setUserDietProgram("Maintence Program");
          break;

        case "gain":
          setUserDietProgram("Mass gain Program");
          break;
        case "loss":
          setUserDietProgram("Fat loss Program");
          break;
        default:
          break;
      }
    }

    handleDietProgram();
  }, [dietProgram]);

  return (
    <div className="program">
      <div className="program-title">
        <div className="program-name">{userDietProgram || "Loading.."}</div>
        <div className="program-subtitle">
          You can adjust your diet program{" "}
        </div>
      </div>

      <Link to="/adjust-program" className="adjust-create">
        <img src={AdjustIcon} alt="adjust" />
      </Link>
    </div>
  );
};

export default ExistingProgram;
