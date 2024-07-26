import axios from "axios";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ReferralCodeProps {}

const ReferralCode: FC<ReferralCodeProps> = () => {
  const [referral, setReferral] = useState("");
  const navigate = useNavigate();

  const handleReferralCode = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No JWT token found in local storage.");
      return;
    }
    if (referral.length < 6) {
      toast.error("Please enter a valid Referral Code");
      return;
    }
    try {
      await axios.post(
        "https://m8aanm1noe.execute-api.ap-southeast-1.amazonaws.com/api/user/update/referral",
        {
          referralCode: referral,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      toast.error("Invalid Referral Code or Referral Code already used");
    }
  };

  return (
    <div className=" max-w-sm mx-auto text-black bg-white h-screen">
      <div className="flex h-full flex-col justify-center items-center w-[80%] mx-auto">
        <h1 className=" text-brand text-3xl font-bold ">Enter Referral Code</h1>
        <p className=" text-black/60 text-xs">
          Earn 25 xp if you have a code as a user
        </p>
        <input
          type="text"
          onChange={(e) => setReferral(e.target.value)}
          value={referral}
          className=" rounded-xl border-2 border-brand py-2 px-6 mt-9 w-full"
          placeholder="03GF6X"
        />
        <button
          onClick={handleReferralCode}
          className="mt-4 py-2 px-6 bg-brand hover:bg-brand/80 transition-all duration-200 text-white text-semibold rounded-xl w-full "
        >
          Submit
        </button>
        <Link
          to={"/"}
          className=" cursor-pointer text-brand hover:text-brand/80 transition-all duration-200 mt-24 font-semibold "
        >
          Skip
        </Link>
      </div>
    </div>
  );
};

export default ReferralCode;
