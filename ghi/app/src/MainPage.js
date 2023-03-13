import Wardrobify from "./imgs/Wardrobify.png"

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <div className="px-4 py-5 my-5 text-center">
        <img
          src={Wardrobify}
          className="mx-auto d-block"
          alt=""
          style={{ objectFit: "contain", width: "60%", height: "60%" }}
        />
    </div>
    </div>
  );
}

export default MainPage;
