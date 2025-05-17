import React from "react";
import { Button } from "primereact/button";

export default function LandingPage() {
    return (
        <div className="text-gray-900">
            {/* Hero Section */}
            <section className="flex flex-column align-items-center justify-content-center min-h-screen text-center p-4">
                <div className="text-center">
                    <img src="/logo.png" className="border-round shadow-2 max-w-20rem" />
                    <h1 className="text-4xl font-bold mb-3">Fun photo challenges</h1>
                    <p className="text-xl text-gray-600 mb-4">
                        Create fun photo challenges for weddings and events. Capture the best moments together.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="flex flex-column md:flex-row min-h-screen p-4 gap-4 justify-content-center align-items-center bg-primary-50">

                <div className="surface-card shadow-2 border-round p-6 w-full md:w-5 text-center">
                    <h2 className="text-2xl font-semibold mb-3">Design Your Challenge</h2>
                    <p className="mb-4 text-gray-600">Customize backgrounds, text, and color palettes in our intuitive editor.</p>
                    <img
                        src="/product-1.png"
                        alt="Editor Screenshot"
                        className="border-round shadow-2 w-full max-h-96 object-contain"
                    />
                </div>

                <div className="surface-card shadow-2 border-round p-6 w-full md:w-5 text-center">
                    <h2 className="text-2xl font-semibold mb-3">Upload & Share</h2>
                    <p className="mb-4 text-gray-600">Guests upload their photos and view all entries in a shared gallery.</p>
                    <img
                        src="/product-2.png"
                        alt="Upload Screenshot"
                        className="border-round shadow-2 w-full max-h-96 object-contain"
                    />
                </div>

            </section>

            {/* Hosting Options */}
            <section className="flex flex-column align-items-center justify-content-center text-center min-h-screen p-4">
                <div>
                    <h2 className="text-3xl font-bold mb-3">Get Started</h2>
                    <p className="text-gray-600 mb-4">
                        Choose the hosting option that works best for you.
                    </p>
                    <div className="flex flex-column md:flex-row justify-content-center gap-4">
                        <div className="bg-yellow-100 border-round p-4 w-full md:w-5">
                            <h3 className="text-xl font-semibold mb-2">Buy Me a Coffee ☕</h3>
                            <p className="mb-3">Support me and get your hosted version — no setup required.</p>
                            <p className="mb-3">Make sure to include your email so I can reach out. Thanks! 😊</p>
                            <a
                                href="https://buymeacoffee.com/floriandula"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button label="Buy Me a Coffee" className="p-button-warning" />
                            </a>
                        </div>

                        <div className="bg-blue-100 border-round p-4 w-full md:w-5">
                            <h3 className="text-xl font-semibold mb-2">Self-Host with GitHub</h3>
                            <p className="mb-3">Prefer DIY? Get the full source code and deploy it yourself.</p>
                            <a
                                href="https://github.com/floriandulzky/memorysnap"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button label="View on GitHub" className="p-button-outlined" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-gray-500 py-4">
                &copy; {new Date().getFullYear()} MemorySnap — Built with ❤️
            </footer>
        </div>
    );
}
