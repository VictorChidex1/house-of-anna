import ImageUploader from "../components/admin/ImageUploader";
import ImageGrid from "../components/admin/ImageGrid";

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-brand-dark mb-1">Dashboard</h1>
        <p className="text-sm text-brand-gray">Upload and manage gallery images.</p>
      </div>

      <ImageUploader />

      <div>
        <h2 className="font-serif text-xl text-brand-dark mb-4">Gallery Management</h2>
        <ImageGrid />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
