WITH Ventas_T1 AS (
    SELECT 
        t.ID_producto,
        SUM(t.Cantidad) AS Total_Cantidad
    FROM Transacciones t
    WHERE t.Fecha BETWEEN '2023-10-01' AND '2023-12-31'
    GROUP BY t.ID_producto
),
Ventas_T0 AS (
    SELECT 
        t.ID_producto,
        SUM(t.Cantidad) AS Total_Cantidad
    FROM Transacciones t
    WHERE t.Fecha BETWEEN '2022-10-01' AND '2022-12-31'
    GROUP BY t.ID_producto
),
Crecimiento AS (
    SELECT 
        v1.ID_producto,
        v1.Total_Cantidad AS Cantidad_2023,
        COALESCE(v0.Total_Cantidad, 0) AS Cantidad_2022,
        CASE 
            WHEN COALESCE(v0.Total_Cantidad, 0) = 0 THEN NULL
            ELSE ((v1.Total_Cantidad - v0.Total_Cantidad) / v0.Total_Cantidad) * 100
        END AS Porcentaje_Crecimiento
    FROM Ventas_T1 v1
    LEFT JOIN Ventas_T0 v0 ON v1.ID_producto = v0.ID_producto
)
SELECT 
    p.Nombre,
    c.Cantidad_2023,
    c.Cantidad_2022,
    c.Porcentaje_Crecimiento
FROM Crecimiento c
JOIN Productos p ON c.ID_producto = p.ID_producto
ORDER BY c.Cantidad_2023 DESC
LIMIT 5;
