import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { BiSolidImageAlt } from "react-icons/bi";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
  icon?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled,
  icon,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      try {
        const file = files[0];

        if (file.size / 1024 / 1024 > 2) {
          throw new Error("Image size is too big! Maximum: 2MB.");
        }

        const reader = new FileReader();

        reader.onload = (event: any) => {
          setBase64(event.target.result);
          handleChange(event.target.result);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        if (typeof error === "string") {
          toast.error(error);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong!");
        }
      }
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
  });

  if (icon) {
    return (
      <div
        {...getRootProps({
          className: "cursor-pointer flex items-end",
        })}
      >
        <input {...getInputProps()} />
        <BiSolidImageAlt color="white" size={25} className="opacity-60" />;
      </div>
    );
  }

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
