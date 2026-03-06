import { AbstractLightningBananaIcon } from "./Icons";

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <AbstractLightningBananaIcon className="w-6 h-6 text-orange-500" />
                        <span className="text-lg font-bold text-white tracking-tight">Nano Banana</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-6">
                        The future of freshness. We believe in uncompromised quality and 100% natural ingredients.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Shop Links</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Cream Mango</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Dutch Chocolate</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Ruby Pomegranate</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Support</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">Newsletter Signup</h4>
                    <p className="text-sm mb-4">Stay updated on new flavors and exclusive offers.</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-sm w-full focus:outline-none focus:border-orange-500 text-white"
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md text-sm font-semibold transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-sm text-center">
                &copy; {new Date().getFullYear()} Nano Banana. All rights reserved.
            </div>
        </footer>
    );
}
