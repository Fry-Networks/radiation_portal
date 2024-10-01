import { submitGmcKey } from "@/app/server/Gmc";
import { useWallet } from "@txnlab/use-wallet";

export function SubmitGMCButton({
  valid,
  paramID,
  minerKey,
  updateMessage,
  disappearInput,
}: {
  valid?: boolean;
  paramID: string;
  minerKey: string;
  updateMessage: ({
    message,
    color,
  }: {
    message: string;
    color: string;
  }) => void;
  disappearInput: Function;
}) {
  const { activeAddress } = useWallet();

  const isValidAppKey = /^[0-9]{11}$/i.test(paramID);
  const isValidMiner = /^([A-Z]{2,6})-[A-Z0-9]{31,33}$/i.test(minerKey);
  const isValidKeys = isValidAppKey && isValidMiner;

  const handleGmcSubmit = async (
    
    updateMessage: Function,
    disappearInput: Function,
    activeAddress: string
  ) => {
    disappearInput(true);
    updateMessage({ message: "Submitting Key...", color: "white" });

    try {
      const response = await submitGmcKey(paramID,minerKey,activeAddress);
      updateMessage(response?.data);
    } catch (error) {
      console.error("Error submitting Gmc key:", error);
      updateMessage({
        message: "Error submitting key.",
        color: "red",
      });
    } finally {
      disappearInput(false);
    }
  };

  return (
    <button
      onClick={() =>
        handleGmcSubmit( updateMessage,disappearInput,activeAddress!)
      }
      className={`py-4 px-6 text-base font-medium rounded-lg focus:outline-none ${
        isValidKeys ? "bg-[#00FFFF] cursor-pointer" : "bg-gray-400 cursor-not-allowed"
      }`}
      disabled={!isValidKeys}
    >
      Submit
    </button>
  );
}
