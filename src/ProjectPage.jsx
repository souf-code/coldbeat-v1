import React, { useState, useEffect } from 'react';
import { COLUMN_TYPES, getColumns, addColumn, updateColumn, deleteColumn, getRows, addRow, updateRow, deleteRow, testConnection } from './supabase';

function ProjectPage({ teamName }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null);
  const [newColumn, setNewColumn] = useState({
    name: '',
    type: COLUMN_TYPES.TEXT,
    options: []
  });
  const [newRow, setNewRow] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load columns and rows when team space changes
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Test Supabase connection first
        const isConnected = await testConnection();
        if (!isConnected) {
          throw new Error('Failed to connect to Supabase');
        }

        const [columnsData, rowsData] = await Promise.all([
          getColumns(teamName),
          getRows(teamName)
        ]);
        setColumns(columnsData);
        setRows(rowsData);
      } catch (error) {
        console.error('Error initializing data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [teamName]);

  const handleAddColumn = async () => {
    try {
      const column = await addColumn(teamName, {
        ...newColumn,
        position: columns.length
      });
      setColumns([...columns, column]);
      setShowColumnModal(false);
      setNewColumn({ name: '', type: COLUMN_TYPES.TEXT, options: [] });
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const handleUpdateColumn = async (columnId, updates) => {
    try {
      const updatedColumn = await updateColumn(columnId, updates);
      setColumns(columns.map(col => 
        col.id === columnId ? updatedColumn : col
      ));
      setEditingColumn(null);
    } catch (error) {
      console.error('Error updating column:', error);
    }
  };

  const handleDeleteColumn = async (columnId) => {
    try {
      await deleteColumn(columnId);
      setColumns(columns.filter(col => col.id !== columnId));
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  const handleAddRow = async (e) => {
    e.preventDefault();
    try {
      const row = await addRow(teamName, newRow);
      setRows([...rows, row]);
      setNewRow({});
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleUpdateCell = async (rowId, columnId, value) => {
    try {
      const row = rows.find(r => r.id === rowId);
      const updatedValues = { ...row.values, [columnId]: value };
      const updatedRow = await updateRow(rowId, updatedValues);
      setRows(rows.map(r => r.id === rowId ? updatedRow : r));
      setEditingCell(null);
    } catch (error) {
      console.error('Error updating cell:', error);
    }
  };

  const handleDeleteRow = async (rowId) => {
    try {
      await deleteRow(rowId);
      setRows(rows.filter(row => row.id !== rowId));
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const renderColumnHeader = (column) => {
    if (editingColumn === column.id) {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={column.name}
            onChange={(e) => handleUpdateColumn(column.id, { name: e.target.value })}
            className="bg-transparent border border-white/20 rounded px-2 py-1 text-white/90 focus:outline-none focus:ring-1 focus:ring-white/30"
            autoFocus
          />
          <button
            onClick={() => setEditingColumn(null)}
            className="text-white/70 hover:text-white"
          >
            ✓
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <span
          onClick={() => setEditingColumn(column.id)}
          className="cursor-pointer hover:text-white"
        >
          {column.name}
        </span>
        <button
          onClick={() => handleDeleteColumn(column.id)}
          className="text-white/50 hover:text-white"
        >
          🗑️
        </button>
      </div>
    );
  };

  const renderCell = (row, column) => {
    const value = row.values?.[column.id] || '';
    const isEditing = editingCell === `${row.id}-${column.id}`;

    if (isEditing) {
      return (
        <div className="flex items-center space-x-2">
          {renderCellInput(column, value, (newValue) => {
            handleUpdateCell(row.id, column.id, newValue);
          })}
          <button
            onClick={() => setEditingCell(null)}
            className="text-white/70 hover:text-white"
          >
            ✓
          </button>
        </div>
      );
    }

    return (
      <div 
        className="cursor-pointer hover:bg-white/5 px-2 py-1 rounded"
        onClick={() => setEditingCell(`${row.id}-${column.id}`)}
      >
        {renderCellValue(column, value)}
      </div>
    );
  };

  const renderCellInput = (column, value, onChange) => {
    switch (column.type) {
      case COLUMN_TYPES.CHECKBOX:
        return (
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="rounded border-white/20 bg-transparent"
          />
        );
      case COLUMN_TYPES.SELECT:
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent border border-white/20 rounded px-2 py-1 text-white/90 focus:outline-none focus:ring-1 focus:ring-white/30"
          >
            <option value="">Select...</option>
            {column.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case COLUMN_TYPES.DATE:
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent border border-white/20 rounded px-2 py-1 text-white/90 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        );
      case COLUMN_TYPES.NUMBER:
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent border border-white/20 rounded px-2 py-1 text-white/90 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent border border-white/20 rounded px-2 py-1 text-white/90 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        );
    }
  };

  const renderCellValue = (column, value) => {
    switch (column.type) {
      case COLUMN_TYPES.CHECKBOX:
        return value ? '✓' : '✗';
      case COLUMN_TYPES.DATE:
        return value ? new Date(value).toLocaleDateString() : '';
      default:
        return value || '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-8 bg-gray-900 flex items-center justify-center">
        <div className="text-white/70">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 bg-gray-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
          <h3 className="font-medium mb-2">Error Loading Data</h3>
          <p>{error}</p>
          <p className="mt-2 text-sm text-red-400">
            Please check your Supabase configuration and environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">{teamName}</h1>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded">
            <span className="mr-1">🔍</span> Search
          </button>
          <button className="px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded">
            <span className="mr-1">⚡</span> Filter
          </button>
          <button className="px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded">
            <span className="mr-1">↕</span> Sort
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.id} className="px-4 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  {renderColumnHeader(column)}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                <button
                  onClick={() => setShowColumnModal(true)}
                  className="text-white/70 hover:text-white"
                >
                  ➕
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/5 transition-colors">
                {columns.map((column) => (
                  <td key={column.id} className="px-4 py-2 text-sm text-white/90">
                    {renderCell(row, column)}
                  </td>
                ))}
                <td className="px-4 py-2 text-sm text-white/90">
                  <button
                    onClick={() => handleDeleteRow(row.id)}
                    className="text-white/50 hover:text-white"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {/* New Row Form */}
            <tr className="hover:bg-white/5 transition-colors">
              <td colSpan={columns.length + 1} className="px-4 py-2">
                <form onSubmit={handleAddRow} className="flex items-center space-x-4">
                  {columns.map((column) => (
                    <div key={column.id} className="flex-1">
                      {renderCellInput(column, newRow[column.id] || '', (value) => {
                        setNewRow({ ...newRow, [column.id]: value });
                      })}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-white/10 text-white rounded hover:bg-white/20"
                  >
                    Add
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>

        {/* New Column Modal */}
        {showColumnModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h3 className="text-lg font-medium text-white mb-4">Add New Column</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Column name"
                  value={newColumn.name}
                  onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
                  className="w-full px-3 py-2 bg-transparent border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
                />
                <select
                  value={newColumn.type}
                  onChange={(e) => setNewColumn({ ...newColumn, type: e.target.value })}
                  className="w-full px-3 py-2 bg-transparent border border-white/20 rounded text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                >
                  {Object.entries(COLUMN_TYPES).map(([key, value]) => (
                    <option key={value} value={value}>
                      {key.charAt(0) + key.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                {newColumn.type === COLUMN_TYPES.SELECT && (
                  <input
                    type="text"
                    placeholder="Options (comma-separated)"
                    value={newColumn.options.join(', ')}
                    onChange={(e) => setNewColumn({
                      ...newColumn,
                      options: e.target.value.split(',').map(opt => opt.trim())
                    })}
                    className="w-full px-3 py-2 bg-transparent border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                )}
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setShowColumnModal(false)}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddColumn}
                  className="px-4 py-2 text-sm bg-white/10 text-white rounded hover:bg-white/20"
                >
                  Add Column
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPage; 