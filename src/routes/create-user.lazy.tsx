import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { useCreateNewUser } from '../services/queries/userQuery'

export const Route = createFileRoute('/create-user')({
    component: () => <CreateNewUSer />
})

function CreateNewUSer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { mutateAsync: createUser, isPending, isError, isSuccess } = useCreateNewUser()
    const roles = ['Chief Credit Officer', 'Section Head', 'Department Director', 'Division Manager', 'Admin']
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({ email, role, password });
        const userData = await createUser({ email, password, role })

        console.log({ userData });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-slate-400 rounded p-4">
            {
                isSuccess && <div className="bg-green-100 text-green-800 p-2.5 rounded-lg mb-5">User created successfully</div>
            }
            {
                isError && <div className="bg-red-100 text-red-800 p-2.5 rounded-lg mb-5">An error occurred. Please try again</div>
            }
            {
                isPending && <div className="bg-blue-100 text-blue-800 p-2.5 rounded-lg mb-5">Creating user...</div>
            }
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New user email</label>
                <input type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required />
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New user password</label>
                <input type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required />
            </div>

            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <select id="roles"
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Select a role</option>
                        {
                            roles.map((role) => <option key={role} value={role}>{role}</option>)
                        }
                    </select>
                </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
}

