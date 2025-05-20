export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-white py-2">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    {new Date().getFullYear()}
                </p>
                <p className="text-sm">
                    Realizada por {"Mario Bravo"}
                </p>
                <a
                    href="https://www.mariobp.es"
                    className="text-sm text-blue-400 hover:text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    www.mariobp.es
                </a>
            </div>
        </footer>
    );
}