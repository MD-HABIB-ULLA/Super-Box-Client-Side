import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState();
  const axiosPublic = useAxiosPublic();
  const fetchFeedbacks = async () => {
    const res = await axiosPublic.get("/feedback");
    setFeedbacks(res.data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);
  const handleStatusChange = (id, newStatus) => {
    console.log(id, newStatus);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Feedbacks</h1>
    <div className="overflow-hidden rounded-xl border-2 border-indigo-600">
    <div className="overflow-x-auto ">
        <table className="min-w-full bg-white  ">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 px-4 border-b">Topic</th>
              <th className="py-2 px-4 border-b">Feedback</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">From</th>
              <th className="py-2 px-4 border-b">Website</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks?.map((feedback) => (
              <tr key={feedback._id} className="border-b">
                <td className="py-2 px-4">{feedback.topic}</td>
                <td className="py-2 px-4">{feedback.feedback}</td>
                <td className="py-2 px-4">{feedback.email}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      feedback.from === "seller"
                        ? "bg-green-200 text-green-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {feedback.from}
                  </span>
                </td>
                <td className="py-2 px-4">{feedback.website || "N/A"}</td>
                <td className="py-2 px-4">
                  <select
                    value={feedback.status}
                    onChange={(e) =>
                      handleStatusChange(feedback._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="on work">On Work</option>
                    <option value="complete">Complete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Feedbacks;
