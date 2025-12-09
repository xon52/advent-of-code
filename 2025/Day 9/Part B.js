import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const startTime = performance.now();

	const data = getFileData(import.meta, puzzle);
	const tiles = data.map((row) => row.split(',').map(Number));

	// Returns true if point is inside OR on the boundary (inclusive)
	const isPointInPolygon = (px, py, polygon) => {
		let inside = false;

		for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
			const [xi, yi] = polygon[i];
			const [xj, yj] = polygon[j];

			// Check if point is on this edge (combined with ray casting)
			if (xi === xj && px === xi) {
				// Vertical edge
				if (py >= Math.min(yi, yj) && py <= Math.max(yi, yj)) return true;
			} else if (yi === yj && py === yi) {
				// Horizontal edge
				if (px >= Math.min(xi, xj) && px <= Math.max(xi, xj)) return true;
			} else {
				// Check if point is on diagonal edge
				const dx = xj - xi;
				const dy = yj - yi;
				const dpx = px - xi;
				const dpy = py - yi;
				const cross = dx * dpy - dy * dpx;

				if (Math.abs(cross) < 1e-9) {
					const t = dx !== 0 ? dpx / dx : dpy / dy;
					if (t >= 0 && t <= 1) return true;
				}

				// Ray casting: check if ray crosses edge
				if (yi !== yj) {
					const intersect = ((yi > py) !== (yj > py)) &&
						(px < dx * (py - yi) / dy + xi);
					if (intersect) {
						inside = !inside;
					}
				}
			}
		}
		return inside;
	};

	// Precompute bounding box of polygon for early rejection
	const minPolyX = Math.min(...tiles.map(([x]) => x));
	const maxPolyX = Math.max(...tiles.map(([x]) => x));
	const minPolyY = Math.min(...tiles.map(([, y]) => y));
	const maxPolyY = Math.max(...tiles.map(([, y]) => y));

	// Check if two line segments intersect (excluding endpoints)
	const segmentsIntersect = (p1, p2, p3, p4) => {
		const [x1, y1] = p1;
		const [x2, y2] = p2;
		const [x3, y3] = p3;
		const [x4, y4] = p4;

		// Check if segments are parallel
		const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (Math.abs(denom) < 1e-9) return false; // Parallel lines

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

		// Check if intersection is strictly inside both segments (not at endpoints)
		return t > 0 && t < 1 && u > 0 && u < 1;
	};

	// Check if box is contained in border
	// A box is contained if:
	// 1. All four corners are inside the polygon
	// 2. No edge of the box intersects with any edge of the polygon (excluding endpoints)
	const isContainedInBorder = ({ x1, y1, x2, y2 }) => {
		// Get the four corners of the box
		const minX = Math.min(x1, x2);
		const maxX = Math.max(x1, x2);
		const minY = Math.min(y1, y2);
		const maxY = Math.max(y1, y2);

		// Early rejection: box extends outside polygon bounding box
		if (minX < minPolyX || maxX > maxPolyX || minY < minPolyY || maxY > maxPolyY) {
			return false;
		}

		// Check all four corners are inside (early exit on first failure)
		if (!isPointInPolygon(minX, minY, tiles)) return false;
		if (!isPointInPolygon(maxX, minY, tiles)) return false;
		if (!isPointInPolygon(maxX, maxY, tiles)) return false;
		if (!isPointInPolygon(minX, maxY, tiles)) return false;

		// Check if any box edge intersects with any polygon edge
		const boxEdges = [
			[[minX, minY], [maxX, minY]], // bottom
			[[maxX, minY], [maxX, maxY]], // right
			[[maxX, maxY], [minX, maxY]], // top
			[[minX, maxY], [minX, minY]]  // left
		];

		for (const boxEdge of boxEdges) {
			for (let i = 0, j = tiles.length - 1; i < tiles.length; j = i++) {
				if (segmentsIntersect(boxEdge[0], boxEdge[1], tiles[i], tiles[j])) {
					return false; // Box edge intersects polygon edge
				}
			}
		}

		return true;
	}

	let largestArea = 0;

	// Populate boxes - only check unique pairs to avoid duplicate work
	for (let i = 0; i < tiles.length; i++) {
		const [x1, y1] = tiles[i];
		for (let j = i; j < tiles.length; j++) {
			const [x2, y2] = tiles[j];
			const area = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
			if (area > largestArea) {
				if (isContainedInBorder({ x1, y1, x2, y2 })) {
					largestArea = area;
				}
			}
		}
	}

	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);

	console.log(puzzle, largestArea, `(${elapsedTime}ms)`);
};

run('sample');
run('puzzle');
