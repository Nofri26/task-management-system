import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, reset } = useForm({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onSuccess: (response) => {
                console.log("Login success");
            },
            onError: (error) => {
                setErrors(error);
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <h1 className="text-bold font-semibold text-2xl">Login</h1>
                <span className="text-gray-400 text-sm">
                    Silahkan masukan username dan password Anda.
                </span>
                <div className="mt-6">
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("username", e.target.value)}
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-10 flex items-center justify-center">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Login
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
