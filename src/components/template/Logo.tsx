export default function Logo() {
    return (
        <div className={`
            flex flex-col items-center justify-center
            h-10 w-10 rounded-full
          bg-white`
        }>
            <div className={`h-3 w-3 rounded-full bg-indigo-600 `}  />
            <div className="flex mt-0.5">
                <div className={`h-3 w-3 rounded-full bg-green-600 mr-0.5`} />
                <div className={`h-3 w-3 rounded-full bg-purple-600`} />
            </div>
        </div>
    )
}