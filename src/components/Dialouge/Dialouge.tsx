import React from "react";

const Dialouge: React.FC = () => {
    return (
      <>
        <div className="border border-dashed border-black flex-col text-center py-10 my-5">
          <p className="text-green-600 font-bold">Thank You!</p>
          <p>✔File Successfully Uploaded.</p>
          <p>Your records will be processed shortly.</p>
        </div>
      </>
    );
}

export default Dialouge;