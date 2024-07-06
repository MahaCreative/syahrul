import InputText from "@/Components/InputText";
import { useForm, usePage } from "@inertiajs/react";
import { MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";
import ReactSelect from "react-select";
export default function Form({ onClose, model, setModel }) {
    const { kategori } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        nama_paket: "",
        lokasi_foto: "",
        deskripsi_paket: "",
        harga_paket: "",
        gambar_paket: "",
        catatan_paket: "",
        aktif_paket: "",
        kategori_id: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Tambah paket",
            text: `Apakah anda yakin ingin menambahkan ${data.title} sebagai paket baru?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tambahkan",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("create.kelola_paket_booking"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal Membuat paket",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menambahkan 1 paket baru",
                            icon: "success",
                            timer: 1500,
                        });
                        reset();
                        onClose(false);
                        setModel(null);
                    },
                    preserveScroll: true,
                });
            } else {
                onClose(false);
            }
        });
    };

    const updateHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Edit paket",
            text: `Apakah anda yakin ingin mengubah data ${data.nama_paket}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("update.kelola_paket_booking"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal mengubah data paket",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil mengubah data paket",
                            icon: "success",
                            timer: 1500,
                        });
                        reset();
                        onClose(false);
                        setModel(null);
                    },
                    preserveScroll: true,
                });
            } else {
                onClose(false);
            }
        });
    };

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nama_paket: model ? model.nama_paket : "",
            lokasi_foto: model ? model.lokasi_foto : "",
            deskripsi_paket: model ? model.deskripsi_paket : "",
            harga_paket: model ? model.harga_paket : "",
            gambar_paket: model ? model.gambar_paket : "",
            catatan_paket: model ? model.catatan_paket : "",
            aktif_paket: model ? model.aktif_paket : "",

            kategori_id: model ? model.kategori.nama_kategori : "",
        });
    }, [model]);
    console.log("====================================");
    console.log(data.kategori_id);
    console.log("====================================");
    return (
        <div
            className="px-8 md:px-16 lg:px-24 w-full h-full flex overflow-y-auto justify-center items-center
        "
        >
            <div className="w-full bg-white py-6 px-4 rounded-md  max-h-[90vh] overflow-y-auto">
                <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                    {model ? `Edit paket ${data.title}` : "Tambah paket"}
                </h3>
                <p className="font-light text-xs italic">
                    Silahkan mengisi form isian dibawah ini dengan benar.
                </p>
                <form
                    onSubmit={model ? updateHandler : submitHandler}
                    className="flex flex-col gap-3 w-full py-3"
                >
                    <InputText
                        required
                        className="w-full"
                        title={"Nama Paket"}
                        name={"nama_paket"}
                        errors={errors.nama_paket}
                        value={data.nama_paket}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <CurrencyInput
                        value={data.harga_paket}
                        prefix="Rp. "
                        name="harga_paket"
                        placeholder="Input Harga Paket"
                        onValueChange={(value) =>
                            setData({
                                ...data,
                                harga_paket: value,
                            })
                        }
                    />
                    <InputText
                        required={model ? false : true}
                        className="w-full"
                        title={"gambar_paket"}
                        name={"gambar_paket"}
                        errors={errors.gambar_paket}
                        type="file"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.files[0],
                            })
                        }
                    />
                    <div className="grid grid-col1 md:grid-cols-2 gap-3 items-center">
                        <InputText
                            required
                            className="w-full"
                            title={"Deskripsi Paket"}
                            name={"deskripsi_paket"}
                            errors={errors.deskripsi_paket}
                            value={data.deskripsi_paket}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            required
                            className="w-full"
                            title={"Catatan Paket"}
                            name={"catatan_paket"}
                            errors={errors.catatan_paket}
                            value={data.catatan_paket}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <ReactSelect
                        defaultValue={{
                            value: model?.kategori.nama_kategori,
                            label: model?.kategori.nama_kategori,
                        }}
                        onChange={(e) =>
                            setData({ ...data, kategori_id: e.value })
                        }
                        options={kategori.map((item) => ({
                            value: item.nama_kategori,
                            label: item.nama_kategori,
                        }))}
                    />
                    <div>
                        <p>Lokasi Foto</p>
                        <Select
                            error={errors.lokasi_foto ? true : false}
                            className="w-full"
                            name="lokasi_foto"
                            value={data.lokasi_foto}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="" selected>
                                {model
                                    ? model.lokasi_foto
                                    : "Pilih Lokasi Foto"}
                            </MenuItem>

                            <MenuItem value={"studio"}>Studio</MenuItem>
                            <MenuItem value={"outdor"}>Outdor</MenuItem>
                        </Select>
                        {errors && (
                            <p className="text-xs text-red-500 italic">
                                {errors.lokasi_foto}
                            </p>
                        )}
                    </div>
                    <div>
                        <p>Status Pemesanan Paket</p>
                        <Select
                            name="aktif_paket"
                            error={errors.aktif_paket ? true : false}
                            value={data.aktif_paket}
                            className="w-full"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">
                                {model
                                    ? model.aktif_paket == 1
                                        ? "paket Dapat Di Pesan"
                                        : "paket Tidak Dpat Di Pesan"
                                    : "Pilih Status Aktif paket"}
                            </MenuItem>
                            <MenuItem value={true}>paket Aktif</MenuItem>
                            <MenuItem value={false}>paket Non Aktif</MenuItem>
                        </Select>
                        {errors && (
                            <p className="text-xs text-red-500 italic">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 items-center">
                        <button className="bg-blue-500 px-4 text-white py-2 font-bold rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
                            {model ? "Update paket" : "Tambah paket"}
                        </button>
                        <button
                            onClick={() => {
                                onClose(false);
                                setModel(null);
                            }}
                            type="button"
                            className="bg-red-500 px-4 text-white py-2 font-bold rounded-md hover:bg-red-600 transition-all duration-300 ease-in-out"
                        >
                            Cancell
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
