export default function Description() {
  return (
      <div className="my-6 px-2">
        <div className="px-6 mb-2 text-gray-700">Here's what you need to know, to start writing:</div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                What can you do
              </th>
              <th scope="col" className="px-6 py-3">
                How to do
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-200 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                For H1 Headings
              </th>
              <td className="px-6 py-4">Type <code className="bg-gray-300 shadow-md rounded-md">#</code> and then press <code className="bg-gray-300 shadow-md rounded-md">space</code></td>
            </tr>
            <tr className="bg-gray-200 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                For Bold
              </th>
              <td className="px-6 py-4">
              Type <code className="bg-gray-300 shadow-md rounded-md">*</code> and then press <code className="bg-gray-300 shadow-md rounded-md">space</code>
              </td>
            </tr>
            <tr className="bg-gray-200 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                For Red Text
              </th>
              <td className="px-6 py-4">
              Type <code className="bg-gray-300 shadow-md rounded-md">**</code> and then press <code className="bg-gray-300 shadow-md rounded-md">space</code>
              </td>
            </tr>
            <tr className="bg-gray-200 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                For Underlined Text
              </th>
              <td className="px-6 py-4">
              Type <code className="bg-gray-300 shadow-md rounded-md">***</code> and then press <code className="bg-gray-300 shadow-md rounded-md">space</code>
              </td>
            </tr>
            <tr className="bg-gray-200 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                For Code Block
              </th>
              <td className="px-6 py-4">
              Type <code className="bg-gray-300 shadow-md rounded-md">```</code> and then press <code className="bg-gray-300 shadow-md rounded-md">space</code>
              </td>
            </tr>
            <tr className="bg-gray-200 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                To Save Your Work
              </th>
              <td className="px-6 py-4">
              Click the <code className="bg-gray-300 shadow-md rounded-md">Save</code> button
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
