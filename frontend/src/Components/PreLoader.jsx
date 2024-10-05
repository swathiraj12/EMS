import "../Assets/CSS/PreLoader.css";

const PreLoader = () => {
  return (
        <>
          <div className=" d-flex justify-content-center h-100 w-100 container-fluid align-items-center">
              <div class="hourglassBackground">
                  <div class="hourglassContainer">
                      <div class="hourglassCurves"></div>
                      <div class="hourglassCapTop"></div>
                      <div class="hourglassGlassTop"></div>
                      <div class="hourglassSand"></div>
                      <div class="hourglassSandStream"></div>
                      <div class="hourglassCapBottom"></div>
                      <div class="hourglassGlass"></div>
                  </div>
              </div>
          </div>
        </ >
  )
}

export default PreLoader