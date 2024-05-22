"use client";
import { Button, Loading, NoAvatar, VetRecords } from "@/components";
import HeadTitle from "@/components/common/HeadTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/selector";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import {
  FaEnvelope,
  FaImage,
  FaLock,
  FaMap,
  FaPencil,
  FaPhone,
  FaUser,
  FaVenusMars,
} from "react-icons/fa6";
import Rodal from "rodal";
import "@/styles/cropper_custom_style.css";
import { apiGetCurrent, apiUpdateCurrent } from "@/apis";
import { getCurrent } from "@/redux/user/userSlice";

interface InitState {
  visible: boolean;
  isLoading: boolean;
  avatar: string;
  fullName: string | null;
  password: string;
  gender: boolean | any;
  phone: string | null;
  address: string | null;
  crop: {
    x: number;
    y: number;
  };
  zoom: number;
  modal: {
    title: string;
    key: string;
  };
  croppedImage: string;
  [key: string]: any;
}

const initState = {
  visible: false,
  isLoading: false,
  avatar: "",
  fullName: "",
  password: "",
  gender: true,
  phone: "",
  address: "",
  crop: { x: 0, y: 0 },
  zoom: 1,
  modal: {
    title: "",
    key: "",
  },
  croppedImage: "",
};

const Account = () => {
  const user: User = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [pageState, setPageState] = useState<InitState>(initState);

  const fields = [
    {
      icon: <FaUser color="#757575" size={18} />,
      label: "name",
      value: `Dr. ${user.fullName}`,
      key: "fullName",
    },
    {
      icon: <FaEnvelope color="#757575" size={18} />,
      label: "email",
      value: user.email,
      key: "email",
    },
    {
      icon: <FaLock color="#757575" size={18} />,
      label: "password",
      value: `********`,
      key: "password",
    },
    {
      icon: <FaVenusMars color="#757575" size={18} />,
      label: "gender",
      value: user.gender ? "Male" : "Female",
      key: "gender",
    },
    {
      icon: <FaPhone color="#757575" size={18} />,
      label: "phone",
      value: user.phone,
      key: "phone",
    },
    {
      icon: <FaMap color="#757575" size={18} />,
      label: "address",
      value: user.address,
      key: "address",
    },
  ];

  useEffect(() => {
    setPageState((prevState) => ({
      ...prevState,
      fullName: user.fullName,
      gender: user.gender,
      phone: user.phone,
      address: user.address,
    }));
  }, [pageState.visible]);

  const handleChange = (name: string, value: any) => {
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpenModal = (title: string, key: string) => {
    handleChange("visible", true);
    handleChange("modal", { title, key });
  };

  const handleCloseModal = () => {
    setPageState(initState);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      handleChange("avatar", event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = pageState.avatar;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx: any = canvas.getContext("2d");
    ctx.drawImage(
      image,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    const croppedImage = canvas.toDataURL("image/jpeg");
    handleChange("croppedImage", croppedImage);
  };

  const handleSubmit = async () => {
    handleChange("isLoading", true);
    try {
      const formData = new FormData();

      if (pageState.modal.key === "avatar") {
        const blob = await fetch(pageState.croppedImage).then((res) =>
          res.blob()
        );
        const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
        formData.append("avatar", file);
      }

      formData.append(pageState.modal.key, pageState[pageState.modal.key]);

      const data = await apiUpdateCurrent(formData);
      if (data.success) {
        const resData = await apiGetCurrent();
        if (resData.success) {
          const currentUser = resData.data;
          dispatch(getCurrent(currentUser));
        }
        handleCloseModal();
      }
    } catch (error) {
      // console.log(error);
    } finally {
      handleChange("isLoading", false);
    }
  };

  if (pageState.isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-fit pb-5 rounded-xl bg-lg-blue">
      <Rodal visible={pageState.visible} onClose={handleCloseModal}>
        <div className="p-5 w-[500px]">
          <div className="font-semibold text-lg mb-3">
            Change {pageState.modal.title}
          </div>
          {pageState.modal.key === "avatar" ? (
            <>
              <input
                className="hidden"
                type="file"
                id="avatar"
                accept=".jpg,.png"
                onChange={handleFileChange}
              />
              <label
                className="relative h-[200px] bg-lg-blue flex items-center justify-center"
                htmlFor="avatar"
              >
                {!pageState.avatar && <FaImage size={30} />}
                <Cropper
                  image={pageState.avatar}
                  crop={pageState.crop}
                  zoom={pageState.zoom}
                  aspect={1 / 1}
                  onCropChange={(e) => handleChange("crop", e)}
                  onCropComplete={onCropComplete}
                  onZoomChange={(e) => handleChange("zoom", e)}
                />
              </label>
              <div className="py-4">
                <input
                  type="range"
                  value={pageState.zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    handleChange("zoom", e.target.value);
                  }}
                  className="w-full"
                />
              </div>
            </>
          ) : (
            <>
              {pageState.modal.key !== "gender" ? (
                <input
                  className="p-2 mb-2 w-full border-2"
                  type={pageState.modal.key !== "phone" ? "text" : "number"}
                  value={pageState[pageState.modal.key] || ""}
                  placeholder={`Enter your new ${pageState.modal.title}`}
                  onChange={(e) =>
                    handleChange(pageState.modal.key, e.target.value)
                  }
                />
              ) : (
                <select
                  className="p-2 mb-2 w-full border-2"
                  value={pageState[pageState.modal.key]}
                  onChange={(e) =>
                    handleChange(pageState.modal.key, e.target.value)
                  }
                >
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              )}
            </>
          )}
          <div className="text-right">
            <Button
              btnType="secondary"
              style={{
                width: "fit-content",
                marginRight: 8,
              }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              btnType="primary"
              style={{
                width: "fit-content",
              }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </Rodal>
      <HeadTitle
        style={{
          position: "relative",
          background: "#fff",
        }}
      >
        My Profile
      </HeadTitle>
      <div className="flex m-5 relative">
        <div className="shadow-lg bg-secondary rounded-xl p-2">
          <div className="w-[360px] px-5 pt-5 h-[340px]">
            {user.avatar ? (
              <img
                className="rounded-full h-full w-full border-[1px]"
                src={user.avatar}
              />
            ) : (
              <NoAvatar name={user.fullName} style={{ fontSize: 60 }} />
            )}
          </div>
          <p className="font-semibold text-90 text-2xl p-3 text-center">
            Dr. {user.fullName}
          </p>
          <div className="w-full flex justify-center">
            <Button
              btnType="secondary"
              style={{
                width: "fit-content",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => handleOpenModal("Avatar", "avatar")}
            >
              <FaPencil />
              <span className="ml-2">New avatar</span>
            </Button>
          </div>
        </div>
        <div className="p-5 bg-secondary ml-3 shadow-lg rounded-xl flex-1">
          <div>
            {fields.map((field, i) => {
              return (
                <div className="flex flex-col" key={i}>
                  <div className="flex items-center mb-2 justify-between">
                    <div className="flex items-center">
                      {field.icon}
                      <p className="text-body text-xl ml-2 capitalize">
                        {field.label}
                      </p>
                    </div>
                    {field.key !== "email" && field.key !== "password" && (
                      <button
                        className=""
                        onClick={() => handleOpenModal(field.label, field.key)}
                      >
                        <FaPencil size={12} />
                      </button>
                    )}
                  </div>
                  <p className="font-semibold text-2xl mb-3 text-90 break-all">
                    {field.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <VetRecords />
    </div>
  );
};

export default Account;
