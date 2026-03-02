export function Profile() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Profile
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                John Doe
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Software Engineer
              </p>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-4">
          <DetailRow label="Email" value="john.doe@example.com" />
          <DetailRow label="Location" value="San Francisco, CA" />
          <DetailRow label="Joined" value="January 2026" />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500 dark:text-gray-400 font-medium">
        {label}
      </span>
      <span className="text-gray-900 dark:text-gray-200">{value}</span>
    </div>
  );
}
