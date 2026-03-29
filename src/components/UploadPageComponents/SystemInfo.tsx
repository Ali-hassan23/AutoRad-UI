export default function SystemInfo() {
  return (
    <section className="flex flex-col justify-center">
      <h1 className="text-3xl font-semibold text-gray-900">
        Generate Radiology Report
      </h1>

      <p className="mt-4 text-gray-600 leading-relaxed">
        Upload a chest X-ray scan and AutoRad will analyze the image using
        AI to produce a structured clinical report.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <h3 className="font-medium text-gray-900">Upload</h3>
          <p className="text-sm text-gray-600">
            Provide a high-resolution PNG scan.
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <h3 className="font-medium text-gray-900">AI Analysis</h3>
          <p className="text-sm text-gray-600">
            Deep learning models analyze radiographic features.
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <h3 className="font-medium text-gray-900">Report Generation</h3>
          <p className="text-sm text-gray-600">
            A structured report is generated for clinicians.
          </p>
        </div>
      </div>
    </section>
  );
}