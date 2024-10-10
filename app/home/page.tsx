"use client";

export default function Home() {
    return(  
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-10">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                <span className="pl-4">Kineticare</span> offers a comprehensive tool for a wide range of rehabilitation professionals—including physical therapists, PTAs, occupational therapists, athletic trainers, chiropractors, orthopedic and sports physicians, as well as students—to create personalized home exercise programs that cater to the unique needs of their patients. 
            </p>
            <p className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-6">
                <span className="pl-4">Please</span> note that users should seek professional advice before attempting any exercises or programs found on the site.
            </p>
            <a href="/exercises" className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300">
                OK
            </a>
      </div>   
    );
}
