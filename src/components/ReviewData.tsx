import React from "react";
import StarRating from "./StarRating";
import { ReviewTypes } from "../types/productTypes";


const ReviewerData: React.FC<{ reviewData: ReviewTypes }> = ({ reviewData }) => (
  <div className="border-2 p-5 bg-white rounded-lg shadow-md mt-3">
    <div className="flex justify-between">
      <StarRating rating={reviewData.rating} />
      <p>{reviewData.reviewerName}</p>
      <p>{reviewData.date.split("T")[0]}</p>
    </div>
    <p className="mt-4">{reviewData.comment}</p>
  </div>
);

export default ReviewerData;