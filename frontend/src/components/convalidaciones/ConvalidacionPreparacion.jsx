import React, { useState } from "react";
import { Plus } from "lucide-react";

// Creamos versiones simplificadas de los componentes UI
const Button = ({ children, onClick, className }) => (
  <button 
    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center ${className || ""}`} 
    onClick={onClick}
  >
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className || ""}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b ${className || ""}`}>
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const CardDescription = ({ children }) => (
  <p className="text-gray-500 text-sm">{children}</p>
);

const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

const Tabs = ({ value, onValueChange, children }) => {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { value, onValueChange });
    }
    return child;
  });
  
  return <div>{childrenWithProps}</div>;
};

const TabsList = ({ children, className }) => (
  <div className={`flex border-b mb-4 ${className || ""}`}>
    {children}
  </div>
);

const TabsTrigger = ({ value, disabled, children, onValueChange, ...props }) => (
  <button
    className={`px-4 py-2 ${props.value === value ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    disabled={disabled}
    onClick={() => !disabled && onValueChange(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, ...props }) => (
  <div className={props.value === value ? "block" : "hidden"}>
    {children}
  </div>
);

// Toast notifications system
const Toast = ({ toast, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 max-w-xs animate-fade-in">
    <div className="font-semibold">{toast.title}</div>
    <div className="text-sm text-gray-600">{toast.description}</div>
  </div>
);

// CurriculumsList Component
const CurriculumsList = ({ curriculums, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="grid gap-4">
      {curriculums.map((curriculum) => (
        <div key={curriculum.id} className="border rounded-lg p-4 flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{curriculum.name} ({curriculum.code})</h3>
            <p className="text-sm text-gray-600">{curriculum.universityName} - {curriculum.careerName}</p>
            <p className="text-xs text-gray-500">{curriculum.description}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${curriculum.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {curriculum.active ? 'Activo' : 'Inactivo'}
            </span>
          </div>
          <div className="flex gap-2">
            <Button 
              className="!bg-blue-100 !text-blue-800 hover:!bg-blue-200"
              onClick={() => onEdit(curriculum)}
            >
              Editar
            </Button>
            <Button 
              className="!bg-amber-100 !text-amber-800 hover:!bg-amber-200"
              onClick={() => onToggleStatus(curriculum.id)}
            >
              {curriculum.active ? 'Desactivar' : 'Activar'}
            </Button>
            <Button 
              className="!bg-red-100 !text-red-800 hover:!bg-red-200"
              onClick={() => onDelete(curriculum.id)}
            >
              Eliminar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

// CurriculumForm Component
const CurriculumForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    code: initialData.code || "",
    year: initialData.year || "",
    universityId: initialData.universityId || "",
    universityName: initialData.universityName || "",
    careerId: initialData.careerId || "",
    careerName: initialData.careerName || "",
    description: initialData.description || "",
    active: initialData.active !== undefined ? initialData.active : true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData.id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Código</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Año</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Universidad</label>
          <input
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="hidden"
            name="universityId"
            value={formData.universityId}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Carrera</label>
          <input
            type="text"
            name="careerName"
            value={formData.careerName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="hidden"
            name="careerId"
            value={formData.careerId}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Activo</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button className="!bg-gray-100 !text-gray-800 hover:!bg-gray-200" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? "Actualizar" : "Guardar"} Malla Curricular
        </Button>
      </div>
    </form>
  );
};

// Hook personalizado para las notificaciones toast
function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts([...toasts, { id, title, description }]);
    
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toast, toasts };
}

// Componente principal de gestión de currículos
export function ConvalidacionPreparacion() {
  const [activeTab, setActiveTab] = useState("list");
  const [curriculums, setCurriculums] = useState([
    {
      id: "1",
      name: "Malla 2020",
      code: "IS-2020",
      year: "2020",
      universityId: "1",
      universityName: "Universidad Nacional Mayor de San Marcos",
      careerId: "1",
      careerName: "Ingeniería de Software",
      description: "Malla curricular 2020 para la carrera de Ingeniería de Software.",
      active: true,
    },
    {
      id: "2",
      name: "Malla 2021",
      code: "CC-2021",
      year: "2021",
      universityId: "2",
      universityName: "Pontificia Universidad Católica del Perú",
      careerId: "2",
      careerName: "Ciencias de la Computación",
      description: "Malla curricular 2021 para la carrera de Ciencias de la Computación.",
      active: true,
    },
    {
      id: "3",
      name: "Malla 2019",
      code: "IS-2019",
      year: "2019",
      universityId: "3",
      universityName: "Universidad Nacional de Ingeniería",
      careerId: "3",
      careerName: "Ingeniería de Sistemas",
      description: "Malla curricular 2019 para la carrera de Ingeniería de Sistemas.",
      active: true,
    },
  ]);
  const [editingCurriculum, setEditingCurriculum] = useState(null);
  const { toast, toasts } = useToast();

  const handleAddCurriculum = (curriculum) => {
    const newCurriculum = {
      ...curriculum,
      id: Math.random().toString(36).substring(7),
    };
    setCurriculums([...curriculums, newCurriculum]);
    setActiveTab("list");
    toast({
      title: "Malla curricular agregada",
      description: `La malla curricular ${curriculum.name} ha sido agregada correctamente.`,
    });
  };

  const handleEditCurriculum = (curriculum) => {
    setEditingCurriculum(curriculum);
    setActiveTab("edit");
  };

  const handleUpdateCurriculum = (updatedCurriculum) => {
    setCurriculums(curriculums.map((curr) => (curr.id === updatedCurriculum.id ? updatedCurriculum : curr)));
    setActiveTab("list");
    setEditingCurriculum(null);
    toast({
      title: "Malla curricular actualizada",
      description: `La malla curricular ${updatedCurriculum.name} ha sido actualizada correctamente.`,
    });
  };

  const handleDeleteCurriculum = (id) => {
    setCurriculums(curriculums.filter((curr) => curr.id !== id));
    toast({
      title: "Malla curricular eliminada",
      description: "La malla curricular ha sido eliminada correctamente.",
    });
  };

  const handleToggleStatus = (id) => {
    setCurriculums(curriculums.map((curr) => (curr.id === id ? { ...curr, active: !curr.active } : curr)));
    const curriculum = curriculums.find((curr) => curr.id === id);
    toast({
      title: curriculum?.active ? "Malla curricular desactivada" : "Malla curricular activada",
      description: `La malla curricular ${curriculum?.name} ha sido ${curriculum?.active ? "desactivada" : "activada"} correctamente.`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Mallas Curriculares</CardTitle>
            <CardDescription>Gestione las mallas curriculares disponibles para convalidación</CardDescription>
          </div>
          <Button
            onClick={() => {
              setEditingCurriculum(null);
              setActiveTab("add");
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nueva Malla Curricular
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="list">Lista de Mallas Curriculares</TabsTrigger>
              <TabsTrigger value="add">Agregar Malla Curricular</TabsTrigger>
              <TabsTrigger value="edit" disabled={!editingCurriculum}>
                Editar Malla Curricular
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <CurriculumsList
                curriculums={curriculums}
                onEdit={handleEditCurriculum}
                onDelete={handleDeleteCurriculum}
                onToggleStatus={handleToggleStatus}
              />
            </TabsContent>

            <TabsContent value="add">
              <CurriculumForm onSubmit={handleAddCurriculum} />
            </TabsContent>

            <TabsContent value="edit">
              {editingCurriculum && (
                <CurriculumForm initialData={editingCurriculum} onSubmit={handleUpdateCurriculum} isEditing={true} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Render toasts */}
      <div className="toast-container">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} />
        ))}
      </div>
    </>
  );
}