import InputText from "@/Components/InputText";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import { Facebook, Instagram } from "@mui/icons-material";
import { InputLabel, TextareaAutosize } from "@mui/material";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

export default function Index(props) {
    const setting = props.setting;
    const { data, setData, post, reset, errors } = useForm({
        nama_studio: setting.nama_studio,
        tagline: setting.tagline,
        foto_studio: setting.foto_studio,
        alamat_studio: setting.alamat_studio,
        telp_studio: setting.telp_studio,
        email_studio: setting.email_studio,
        facebook_studio: setting.facebook_studio,
        instagram_studio: setting.instagram_studio,
        link_facebook_studio: setting.link_facebook_studio,
        link_instagram_studio: setting.link_instagram_studio,
        deskripsi_studio: setting.deskripsi_studio,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("admin.update-profile_studio"));
    };
    return (
        <div className="w-full px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out py-6 relative z-[999]">
            <div className="flex justify-between items-start gap-3 flex-col md:flex-row">
                <div className=" bg-black py-6 w-full">
                    <div className="py-8 text-white px-4 md:px-8 flex flex-col  justify-between items-start gap-3 ">
                        <ScrollAnimation
                            animateIn={`fadeInUp`}
                            animateOut={`fadeInUp`}
                            delay={100}
                            className="w-full  flex flex-col h-full py-2 px-2 rounded-md shadow-sm shadow-gray-500/50 transition-all duration-300 ease-in-out"
                        >
                            <div className="w-full py-6 flex justify-end">
                                <img
                                    src={"/storage/" + setting.foto_studio}
                                    alt=""
                                    className="w-full  object-cover object-center"
                                />
                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation
                            animateIn={`fadeInUp`}
                            animateOut={`fadeInUp`}
                            delay={200}
                            className="w-full "
                        >
                            <p className="text-orange-500 text-4xl my-3 border-b-4 border-orange-500 inline-block">
                                About Me
                            </p>
                            <h3 className="capitalize text-4xl md:text-5xl lg:text-7xl font-medium leading-none mb-3 tracking-tighter text-orange-500 ">
                                {setting.nama_studio + " " + setting.tagline}
                            </h3>
                            <p
                                className="text-xl font-light "
                                dangerouslySetInnerHTML={{
                                    __html: setting.deskripsi_studio,
                                }}
                            />
                            <div className="my-3 text-lg font-medium text-orange-500 flex gap-3 items-center">
                                <Link
                                    as="a"
                                    href={setting.link_facebook_studio}
                                    className="flex gap-3"
                                >
                                    <span>
                                        <Facebook
                                            color="inherit"
                                            fontSize="large"
                                        />{" "}
                                    </span>
                                    <span>{setting.facebook_studio}</span>
                                </Link>
                                <Link
                                    as="a"
                                    target="_blank"
                                    href={setting.link_instagram_studio}
                                    className="flex gap-3"
                                >
                                    <span>
                                        <Instagram
                                            color="inherit"
                                            fontSize="large"
                                        />{" "}
                                    </span>
                                    <span>{setting.instagram_studio}</span>
                                </Link>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>
                <div className="w-full">
                    <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                        Profile Studio
                    </h3>
                    <p className="font-light text-xs italic">
                        Silahkan mengisi form isian dibawah ini dengan benar.
                    </p>
                    <div className="py-2 px-3 bg-white w-full">
                        <form onSubmit={submit} action="" className="w-full ">
                            <InputText
                                value={data.nama_studio}
                                error={errors.nama_studio}
                                name="nama_studio"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                label={"Nama Studio"}
                                className="w-full"
                            />
                            <InputText
                                value={data.tagline}
                                error={errors.tagline}
                                name="tagline"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                label={"Tagline"}
                                className="w-full"
                            />
                            <InputText
                                error={errors.foto_studio}
                                name="foto_studio"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.files[0],
                                    })
                                }
                                type="file"
                                label={"Foto Studio"}
                                className="w-full"
                            />
                            <div>
                                <InputLabel id={"alamat_studio"}>
                                    Alamat Studio
                                </InputLabel>
                                <TextareaAutosize
                                    className="rounded-md  w-full"
                                    name="alamat_studio"
                                    value={data.alamat_studio}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                ></TextareaAutosize>
                                {errors.alamat_studio && (
                                    <p className="text-xs text-red-500 italic">
                                        {errors.alamat_studio}
                                    </p>
                                )}
                            </div>
                            <div>
                                <InputLabel id={"deskripsi_studio"}>
                                    Deskripsi Studio
                                </InputLabel>
                                <TextareaAutosize
                                    className="rounded-md  w-full"
                                    name="deskripsi_studio"
                                    value={data.deskripsi_studio}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                ></TextareaAutosize>
                                {errors.deskripsi_studio && (
                                    <p className="text-xs text-red-500 italic">
                                        {errors.deskripsi_studio}
                                    </p>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                                    Contact Studio
                                </h3>
                                <p className="font-light text-xs italic">
                                    Silahkan mengisi form isian dibawah ini
                                    dengan benar.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <InputText
                                        error={errors.telp_studio}
                                        value={data.telp_studio}
                                        name="telp_studio"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        label={"Telp Studio"}
                                        className="w-full"
                                    />
                                    <InputText
                                        error={errors.email_studio}
                                        value={data.email_studio}
                                        name="email_studio"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        label={"Email Studio"}
                                        className="w-full"
                                    />
                                    <InputText
                                        error={errors.facebook_studio}
                                        value={data.facebook_studio}
                                        name="facebook_studio"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        label={"Facebook Studio"}
                                        className="w-full"
                                    />
                                    <InputText
                                        error={errors.instagram_studio}
                                        value={data.instagram_studio}
                                        name="instagram_studio"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        label={"Instagram Studio"}
                                        className="w-full"
                                    />
                                    <InputText
                                        error={errors.link_facebook_studio}
                                        value={data.link_facebook_studio}
                                        name="link_facebook_studio"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        label={"Link Facebook Studio"}
                                        className="w-full"
                                    />
                                    <InputText
                                        error={errors.link_instagram_studio}
                                        value={data.link_instagram_studio}
                                        name="link_instagram_studio"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        label={"Link Instagram Studio"}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="my-3">
                                <button className="bg-orange-500 py-2 px-4 text-white font-bold">
                                    Update Profile Studio
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <Authenticated children={page} title="Profile Studio" />
);
