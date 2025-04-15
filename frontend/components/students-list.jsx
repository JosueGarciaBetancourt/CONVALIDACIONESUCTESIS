"use client"

export function StudentsList({ students, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button
                  className={`btn btn-xs ${student.active ? "btn-success" : "btn-error"}`}
                  onClick={() => onToggleStatus(student.id)}
                >
                  {student.active ? "Active" : "Inactive"}
                </button>
              </td>
              <td>
                <button className="btn btn-info btn-xs mr-2" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button className="btn btn-error btn-xs" onClick={() => onDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
