import "../Assets/CSS/PreLoader.css";

const PreLoader = () => {
  return (
    <>
      <div className=" d-flex justify-content-center h-100 w-100 container-fluid align-items-center">
        <div className="hourglassBackground">
          <div className="hourglassContainer">
            <div className="hourglassCurves"></div>
            <div className="hourglassCapTop"></div>
            <div className="hourglassGlassTop"></div>
            <div className="hourglassSand"></div>
            <div className="hourglassSandStream"></div>
            <div className="hourglassCapBottom"></div>
            <div className="hourglassGlass"></div>
          </div>
        </div>
      </div>
    </ >
  )
}

export default PreLoader