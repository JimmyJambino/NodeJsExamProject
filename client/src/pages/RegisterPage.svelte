<script>
    import { toast } from "@zerodevx/svelte-toast";
    import { navigate } from "svelte-navigator";

    let registerForm;

    let firstName;
    let lastName;
    let email;
    let password;

    async function handleRegister() {
        if (registerForm.reportValidity()) {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            })

            // back to previous page
            navigate(-1)

            toast.push("Successfully signed up.\n Please log in", {
                theme: {
                    "--toastBackground": "#48BB78",
                    "--toastBarBackground": "#2F855A",
                },
                duration: 5000
            })
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
            on:click|preventDefault={handleRegister}
        />
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
        width: 15em;
        padding-top: 5em;
    }

    #submit {
        width: 60%;
        margin-top: 2em;
        align-self: center;
    }
</style>
