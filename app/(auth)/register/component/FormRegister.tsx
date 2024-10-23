'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRootError } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { default as axios } from 'axios'
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Region } from "@/types/region";
import { UserRegisterSchema, UserRegisterType } from "@/types/userRegister";
import { RegisterUser } from "../action/registerUser";
import { toast } from "sonner";
import { CircleNotch } from '@phosphor-icons/react'

const fetchProvinces = async () => {
    const { data } = await axios.get('/api/regions/provinces');
    return data;
};

const fetchCities = async (provinceCode: string) => {
    const { data } = await axios.get(`/api/regions/cities?provinceCode=${provinceCode}`);
    return data;
};

const fetchDistricts = async (provinceCode: string, cityCode: string) => {
    const { data } = await axios.get(`/api/regions/districts?cityCode=${cityCode}&provinceCode=${provinceCode}`);
    return data;
};

const fetchVillages = async (provinceCode: string, cityCode: string, districtCode: string) => {
    const { data } = await axios.get(`/api/regions/villages?districtCode=${districtCode}&cityCode=${cityCode}&provinceCode=${provinceCode}`);
    return data;
};

export default function FormRegister() {

    const formRegister = useForm<UserRegisterType>({
        resolver: zodResolver(UserRegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            province: { code: "", name: "" },
            city: { code: "", name: "" },
            district: { code: "", name: "" },
            village: { code: "", name: "" },
        }
    });

    const { data: provinces, isLoading: isLoadingProvinces } = useQuery<Region[]>({
        queryKey: ['provinces'],
        queryFn: fetchProvinces
    });

    // Fetch cities based on selected province
    const provinceCode = formRegister.watch('province');
    const { data: cities, isLoading: isLoadingCities } = useQuery<Region[]>({
        queryKey: ['cities', provinceCode.code],
        queryFn: () => fetchCities(provinceCode.code),
        enabled: !!provinceCode
    });

    // Fetch districts based on selected city
    const cityCode = formRegister.watch('city');
    const { data: districts, isLoading: isLoadingDistricts } = useQuery<Region[]>({
        queryKey: ['districts', provinceCode.code, cityCode.code,],
        queryFn: () => fetchDistricts(provinceCode.code, cityCode.code),
        enabled: !!cityCode
    });

    // Fetch villages based on selected district
    const districtCode = formRegister.watch('district');
    const { data: villages, isLoading: isLoadingVillages } = useQuery<Region[]>({
        queryKey: ['villages', provinceCode.code, cityCode.code, districtCode.code],
        queryFn: () => fetchVillages(provinceCode.code, cityCode.code, districtCode.code),
        enabled: !!districtCode
    });

    const  { mutate: registerUser, isPending: isLoadingRegister } = useMutation({
        mutationFn: RegisterUser,
        onSuccess: async (data: { success: boolean, message?: string, data?: UserRegisterType }) => {
            if(!data.success) {
                formRegister.setError('root', {
                    message: data.message
                })
                return;
            }
            formRegister.reset();

            toast.success(`User ${data.data?.email} berhasil didaftarkan, Login untuk melanjutkan`, {
                id: "register-user",
            });
        },
        onError: (e) => {
            formRegister.setError('root', {
                message: e.message
            });

            toast.error("Something went wrong", {
                id: "register-user",
            });
        },
    });

    const handleRegister = async (values: UserRegisterType) => {
        await registerUser(values);
    }

    return (
        <Form {...formRegister}>
            <form onSubmit={formRegister.handleSubmit(handleRegister)} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-x-4">
                    <div className="space-y-8 flex-1 border-0 md:border-r pr-0 md:pr-4">

                        <FormField
                            control={formRegister.control}
                            name="name"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama Anda" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />

                        <FormField
                            control={formRegister.control}
                            name="email"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Alamat Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="example@domain.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />

                        <FormField
                            control={formRegister.control}
                            name="phoneNumber"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Nomor WA Aktif</FormLabel>
                                    <FormControl>
                                        <Input placeholder="081xxx" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />

                        <FormField
                            control={formRegister.control}
                            name="password"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />
                        <FormField
                            control={formRegister.control}
                            name="confirmPassword"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />
                    </div>
                    <hr className="my-4" />
                    <div className="space-y-8 flex-1">
                        {
                            <FormField
                                control={formRegister.control}
                                name="province.code"
                                render={() => <FormItem>
                                    <FormLabel>Provinsi</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                const selectedProvince = provinces?.find(prov => prov.code === value);
                                                
                                                formRegister.setValue("province", { code: selectedProvince!.code, name: selectedProvince!.name });
                                                formRegister.setValue("city", { code: '', name: '' });
                                                formRegister.setValue("district", { code: '', name: '' });
                                                formRegister.setValue("village", { code: '', name: '' });
                                            }}
                                            disabled={provinces?.length === 0 || isLoadingProvinces}
                                        >
                                            <SelectTrigger>
                                                <span>{(isLoadingProvinces) ? "Loading..." : formRegister.watch('province.name') || "Pilih Provinsi"}</span>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {provinces?.map((prov) => (
                                                    <SelectItem key={prov.code} value={prov.code}>
                                                        {prov.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                } 
                            />
                        }

                        {/* City Select */}
                        <FormField
                            control={formRegister.control}
                            name="city.code"
                            render={() => <FormItem>
                                <FormLabel>Kab / Kota</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            const selectedCity = cities?.find(city => city.code === value);
                                            formRegister.setValue("city", { code: selectedCity!.code, name: selectedCity!.name });
                                            formRegister.setValue("district", { code: '', name: '' });
                                            formRegister.setValue("village", { code: '', name: '' });
                                        }}
                                        disabled={(!formRegister.getValues('province.code') && cities && cities?.length === 0 ) || isLoadingCities}
                                    >
                                        <SelectTrigger>
                                            <span>{(isLoadingCities) ? "Loading..." : formRegister.watch('city.name') || "Pilih Kabupaten atau Kota"}</span>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities?.map((city) => (
                                                <SelectItem key={city.code} value={city.code}>
                                                    {city.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            }
                        />

                        {/* District Select */}
                        <FormField
                            control={formRegister.control}
                            name="district.code"
                            render={() => <FormItem>
                                    <FormLabel>Kecamatan</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                const selectedDistrict = districts?.find(district => district.code === value);
                                                formRegister.setValue("district", { code: selectedDistrict!.code, name: selectedDistrict!.name });
                                                formRegister.setValue("village", { code: '', name: '' });
                                            }}
                                            disabled={(!formRegister.getValues('city.code') && districts && districts?.length === 0 ) || isLoadingDistricts}
                                        >
                                            <SelectTrigger>
                                                <span>{(isLoadingDistricts) ? "Loading..." : formRegister.watch('district.name') || "Pilih Kecamatan"}</span>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {districts?.map((district) => (
                                                    <SelectItem key={district.code} value={district.code}>
                                                        {district.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />

                        {/* Village Select */}
                        <FormField
                            control={formRegister.control}
                            name="village.code"
                            render={() => <FormItem>
                                <FormLabel>Kelurahan / Desa</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            const selectedVillage = villages?.find(village => village.code === value);
                                            formRegister.setValue("village", { code: selectedVillage!.code, name: selectedVillage!.name });
                                        }}
                                        disabled={(!formRegister.getValues('village.code') && villages && villages?.length === 0 ) || isLoadingVillages}
                                    >
                                        <SelectTrigger>
                                            <span>{(isLoadingVillages) ? "Loading..." : formRegister.watch('village.name') || "Pilih Kelurahan / Desa"}</span>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {villages?.map((village) => (
                                                <SelectItem key={village.code} value={village.code}>
                                                    {village.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            }
                        />

                    </div>
                </div>
                <FormRootError />

                <div className="text-center px-10">
                    <Button type="submit" variant="default" className="w-full py-5 font-bold" disabled={isLoadingRegister}>
                        {isLoadingRegister ? <CircleNotch className="animate-spin" size={32} weight="bold" /> : "Daftar"}
                    </Button>
                </div>
            </form>
        </Form >
    )
}