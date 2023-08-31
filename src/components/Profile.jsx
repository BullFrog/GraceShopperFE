

const Profile = () => {
    const email = localStorage.getItem("email");

  return (
    <body>
      <div
        className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-b from-black to-grey-700"
      >
        
        <div>
          <h3 className="">{email}s Profile</h3>
        </div>
      </div>
    </body>
  );
};

export default Profile;
