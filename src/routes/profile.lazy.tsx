import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useSession } from '../hooks/useSession'

export const Route = createLazyFileRoute('/profile')({
    component: () => <Profile />
})

function Profile() {
    const { session } = useSession();

    return (
        <div>

            <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg min-h-80">
                <div className="px-4 py-5">
                    <h1 className="text-xl font-semibold leadiCPng-tight">User Profile</h1>
                    <div className="mt-4">
                        <div className="font-bold">Email:</div>
                        <div className="text-sm text-gray-600">{session?.user.email}</div>
                    </div>
                    <div className="mt-2">
                        <div className="font-bold">Role:</div>
                        <div className="text-sm text-gray-600">{session?.user.role}</div>
                    </div>
                    <div className="mt-2">
                        <div className="font-bold">Account Created:</div>
                        <div className="text-sm text-gray-600">{String(session?.user.createdAt) || ""}</div>
                    </div>
                </div>
                <Link to='/create-user' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                    Create new user
                </Link>
            </div>

        </div>
    )
}