import image from "../assets/sponsored_img-BDF3UAli.png";

function RightNavbar() {
    return (
        <div className="p-1  ">
          <div className="shadow-2xl rounded-2xl overflow-hidden p-4">
            <h1 className="font-bold">Sponsored </h1>
              <img 
                src={image} 
                alt="Sponsored Image" 
                className="w-full my-2"
              />
              <p className=" text-gray-700 py-2">Email marketing</p>
              <p className="text-gray-500">Supercharge your marketing with a powerful, easy- to-use platform built for results.</p>
          </div>
        </div>
    )
}

export default RightNavbar;