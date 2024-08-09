SELECT 
    p.Categoría,
    COUNT(DISTINCT t.ID_cliente) AS Clientes_Unicos
FROM Transacciones t
JOIN Productos p ON t.ID_producto = p.ID_producto
GROUP BY p.Categoría;
