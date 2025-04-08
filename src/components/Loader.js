import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const Loader = ({ loading, success, error, children }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }
    if (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
    }
  }, [success, error]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <CheckCircle className="w-16 h-16 text-green-500 animate-fadeInScale" />
      </div>
    );
  }

  if (showError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <XCircle className="w-16 h-16 text-red-500 animate-shake" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Loader;
