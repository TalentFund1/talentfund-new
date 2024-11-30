interface BenchmarkRolesProps {
  selectedRole: string;
  onRoleSelect: (role: string) => void;
}

export const BenchmarkRoles = ({ selectedRole, onRoleSelect }: BenchmarkRolesProps) => {
  const roles = [
    'AI Engineer',
    'Frontend Developer',
    'Backend Engineer',
    'Engineering Manager'
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => onRoleSelect(role)}
          className={`p-3 rounded-lg text-sm ${
            selectedRole === role
              ? 'bg-primary text-white'
              : 'bg-background hover:bg-muted'
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
};