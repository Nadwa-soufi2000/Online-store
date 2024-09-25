export default function Error403({ role }) 
{
    <div className="w-[94%] flex justify-center items-center flex-col ">
            <h1 className="font-[Roboto] text-[50px] font-bold text-purple-800">403-ACCESS DENIED</h1>
            <p className="font-[Roboto] text-[30px] text-gray-500">Oops, You don’t have permission to access this page</p>
            {role === '2001' && <button>Go to home page</button>}
    </div>
}