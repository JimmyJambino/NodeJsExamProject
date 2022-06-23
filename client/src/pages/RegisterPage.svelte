<script>
    import { toast } from "@zerodevx/svelte-toast";
    import { navigate } from "svelte-navigator";

    import { makeOptions } from "../store/util.js"

    let registerForm

    let firstName
    let lastName
    let email
    let password

    async function handleRegister() {
        if (registerForm.reportValidity()) {
            const response = await fetch("/api/register", makeOptions("POST", { firstName, lastName, email, password }))
            
            if (response.ok) {
                // back to previous page
                navigate(-1);
                
                toast.push("Successfully signed up.\nPlease log in", {
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                    duration: 5000,
                })
            } else {
                const result = await response.json()

                switch (result.cause) {
                    case "mailAlreadyExists":
                        toast.push("Email already in use", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                        break;
                    case "invalidEmail":
                        toast.push("Email invalid", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                        break;
                    case "invalidPassword":
                        toast.push("password invalid", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                        break;
                    default:
                        toast.push("Server error", {
                            theme: {
                                "--toastBackground": "#F56565",
                                "--toastBarBackground": "#C53030",
                            },
                        })
                        break;
                }
            }
        } else {
            toast.push("Please provide all details", {
                theme: {
                    "--toastBackground": "#F56565",
                    "--toastBarBackground": "#C53030",
                },
            })
        }
    }
</script>

<div id="register-wrapper">
    <form bind:this={registerForm} id="register-form">
        <div>
            <input
                bind:value={firstName}
                type="text"
                placeholder="First name"
                required
            />
            <input
                bind:value={lastName}
                type="text"
                placeholder="Last name"
                required
            />
            <input
                bind:value={email}
                type="email"
                placeholder="mail@mail.com"
                required
            />
            <input
                bind:value={password}
                type="password"
                placeholder="password"
                required
            />
    
            <input
                type="submit"
                id="submit"
                value="Register"
                on:click|preventDefault={handleRegister}
            />
        </div>
    </form>
</div>

<style>
    #register-wrapper {
        display: flex;
        justify-content: center;
        width: auto;
    }

    #register-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 2em;
        box-shadow: 15px 5px 25px rgba(0, 0, 0, 0.3);
        width: 20em;
        padding: 2em;
        margin-top: 20vh;
    }


    #submit {
        width: 10em;
        margin-top: 2em;
        border-radius: 0.5em;
        align-self: center;
    }
</style>
