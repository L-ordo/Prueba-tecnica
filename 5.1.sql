SELECT 
    DATE_FORMAT(t.Fecha, '%Y-%m') AS Mes,
    COUNT(t.ID_transacción) AS Total_Ventas,
    SUM(p.Precio * t.Cantidad) AS Total_Ingresos,
    AVG(p.Precio * t.Cantidad) AS Promedio_Ingresos_por_Venta
FROM Transacciones t
JOIN Productos p ON t.ID_producto = p.ID_producto
WHERE YEAR(t.Fecha) = 2022
GROUP BY Mes
ORDER BY Mes;
