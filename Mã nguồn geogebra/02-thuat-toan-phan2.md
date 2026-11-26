# 02-thuat-toan-phan2.md

Nguồn: GeoGebra (EUPL v1.2). Mã Java đã bỏ bình luận/import để gọn. Chỉ để ĐỌC lấy ý tưởng thuật toán, viết lại bằng JavaScript.

Nội dung: Toàn bộ thuật toán 3D (Algo*): dựng chóp/lăng trụ/nón/trụ/cầu, mặt phẳng, giao tuyến, thiết diện, khoảng cách, góc, đối xứng, quay

Danh sách file trong phần này:
- AlgoPolyhedronPointsPrism.java
- AlgoPolyhedronPointsPrismForExtrusion.java
- AlgoPolyhedronPointsPyramid.java
- AlgoPolyhedronPointsPyramidForExtrusion.java
- AlgoQuadric.java
- AlgoQuadricComputer.java
- AlgoQuadricComputerCone.java
- AlgoQuadricComputerCylinder.java
- AlgoQuadricComputerCylinderOpen.java
- AlgoQuadricComputerSide.java
- AlgoQuadricEnd.java
- AlgoQuadricEndBottom.java
- AlgoQuadricEndTop.java
- AlgoQuadricEnds.java
- AlgoQuadricLimitedConicHeight.java
- AlgoQuadricLimitedConicHeightCone.java
- AlgoQuadricLimitedConicHeightConeForExtrusion.java
- AlgoQuadricLimitedConicHeightCylinder.java
- AlgoQuadricLimitedConicHeightCylinderForExtrusion.java
- AlgoQuadricLimitedPointPointRadius.java
- AlgoQuadricLimitedPointPointRadiusCone.java
- AlgoQuadricLimitedPointPointRadiusCylinder.java
- AlgoQuadricPointNumber.java
- AlgoQuadricPointPointNumber.java
- AlgoQuadricPointVectorNumber.java
- AlgoQuadricSide.java
- AlgoRayPointVector3D.java
- AlgoRotate3D.java
- AlgoRotate3DLine.java
- AlgoRotate3DPointOrientation.java
- AlgoSemicircle3D.java
- AlgoSpherePointRadius.java
- AlgoSphereTwoPoints.java
- AlgoSurfaceOfRevolution.java
- AlgoTangentCurve3D.java
- AlgoTangentLine3D.java
- AlgoTangentPoint3D.java
- AlgoTransformation3D.java
- AlgoTranslate3D.java
- AlgoTranslateVector3D.java
- AlgoUnionPolygons3D.java
- AlgoUnitOrthoVectorPlane.java
- AlgoUnitVector3D.java
- AlgoUnitVectorPoint3D.java
- AlgoVector3D.java
- AlgoVectorPoint3D.java
- AlgoVertexConic3D.java
- AlgoVertexPolygon3D.java
- AlgoVolume.java
- ExtrudeConverter.java
- ExtrusionComputer.java
- Manager3D.java
- RotationConverter.java

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronPointsPrism.java
```java
public class AlgoPolyhedronPointsPrism extends AlgoPolyhedronPoints {
 private Coords uptranslation;
 public AlgoPolyhedronPointsPrism(
   Construction c, String[] labels, GeoPolygon polygon, GeoPointND point) {
  super(c, labels, polygon, point);
 }
 public AlgoPolyhedronPointsPrism(Construction c, String[] labels, GeoPointND[] points) {
  super(c, labels, points);
 }
 public AlgoPolyhedronPointsPrism(
   Construction c, String[] labels, GeoPolygon polygon, NumberValue height) {
  super(c, labels, polygon, height);
 }
 protected void createPolyhedron(GeoPointND[] bottomPoints) {
  setBottom(polyhedron);
  GeoPointND topPoint = getTopPoint();
  bottomPointsLength = bottomPoints.length;
  outputPoints.augmentOutputSize(bottomPointsLength - 1);
  points = new GeoPointND[bottomPointsLength * 2];
  for (int i = 0; i < bottomPointsLength; i++) {
   points[i] = bottomPoints[i];
  }
  points[bottomPointsLength] = topPoint;
  for (int i = 0; i < bottomPointsLength - 1; i++) {
   GeoPoint3D point = outputPoints.getElement(i + 1 - getShift());
   points[bottomPointsLength + 1 + i] = point;
  }
  for (int i = 0; i < bottomPointsLength; i++) {
   polyhedron.startNewFace();
   polyhedron.addPointToCurrentFace(points[i]);
   polyhedron.addPointToCurrentFace(points[(i + 1) % bottomPointsLength]);
   polyhedron.addPointToCurrentFace(points[bottomPointsLength + ((i + 1) % bottomPointsLength)]);
   polyhedron.addPointToCurrentFace(points[bottomPointsLength + i]);
   polyhedron.endCurrentFace();
  }
  polyhedron.startNewFace();
  for (int i = 0; i < bottomPointsLength; i++) {
   polyhedron.addPointToCurrentFace(points[bottomPointsLength + i]);
  }
  polyhedron.endCurrentFace();
  polyhedron.setCurrentFaceIsTopFace();
 }
 protected GeoPolyhedron.Type getPolyhedronType() {
  return GeoPolyhedron.Type.PRISM;
 }
 protected GeoPointND getTopPoint(int index) {
  if (index == 0) {
   return getTopPoint();
  }
  return outputPoints.getElement(index - getShift());
 }
 protected void updateOutput(int newBottomPointsLength) {
  int nOld = outputPoints.size() + getShift();
  GeoPointND[] bottomPoints = getBottomPoints();
  GeoSegmentND[] bottomSegments = getBottom().getSegments();
  if (newBottomPointsLength > nOld) {
   polyhedron.updateSegmentsLinked();
   int length = newBottomPointsLength - nOld;
   outputPoints.augmentOutputSize(length, false);
   if (getPolyhedron().allLabelsAreSet()) {
    outputPoints.setLabels(null);
   }
   updateOutputPoints();
   int l = nOld + length;
   for (int i = nOld; i < l; i++) {
    polyhedron.startNewFace();
    polyhedron.addPointToCurrentFace(bottomPoints[i]);
    polyhedron.addPointToCurrentFace(bottomPoints[(i + 1) % l]);
    polyhedron.addPointToCurrentFace(getTopPoint((i + 1) % l));
    polyhedron.addPointToCurrentFace(getTopPoint(i));
    polyhedron.endCurrentFace();
    GeoPolygon3D polygon = polyhedron.createPolygon(i + 1); 
    if (polyhedron.allLabelsAreSet()) {
     polygon.setLabel(null);
    }
    outputPolygonsSide.addOutput(polygon, false);
    addToOutputIf3D(outputSegmentsSide, polygon.getSegments()[3]);
    outputSegmentsTop.addOutput((GeoSegment3D) polygon.getSegments()[2], false);
   }
   if (getPolyhedron().allLabelsAreSet()) {
    outputSegmentsSide.setLabels(null);
    outputSegmentsTop.setLabels(null);
    outputPolygonsSide.setLabels(null);
   }
   refreshOutput();
  } else if (newBottomPointsLength < nOld) {
   for (int i = newBottomPointsLength; i < bottomPointsLength; i++) {
    outputPoints.getElement(i - getShift()).setUndefined();
   }
   updateOutputPoints();
   outputSegmentsTop
     .getElement(newBottomPointsLength - 1)
     .modifyInputPoints(getTopPoint(newBottomPointsLength - 1), getTopPoint());
   GeoPolygon polygon = getTopFace();
   GeoPointND[] p = new GeoPointND[newBottomPointsLength];
   p[0] = getTopPoint();
   for (int i = 0; i < newBottomPointsLength - 1; i++) {
    p[1 + i] = getTopPoint(i + 1);
   }
   polygon.modifyInputPoints(p);
   polygon.setSegments(outputSegmentsTop.getOutput(new GeoSegment3D[newBottomPointsLength]));
   polygon.calcArea();
   polygon = outputPolygonsSide.getElement(newBottomPointsLength - 1);
   p = new GeoPointND[4];
   p[0] = bottomPoints[newBottomPointsLength - 1];
   p[1] = bottomPoints[0];
   p[2] = getTopPoint();
   p[3] = getTopPoint(newBottomPointsLength - 1);
   polygon.setPoints(p, null, false); 
   GeoSegmentND[] s = new GeoSegmentND[4];
   if (bottomSegments.length > newBottomPointsLength - 1) {
    s[0] = bottomSegments[newBottomPointsLength - 1];
   }
   s[1] = outputSegmentsSide.getElement(0);
   s[2] = outputSegmentsTop.getElement(newBottomPointsLength - 1);
   s[3] = outputSegmentsSide.getElement(newBottomPointsLength - 1);
   polygon.setSegments(s);
   polygon.calcArea();
  } else {
   updateOutputPoints();
  }
  if (bottomPointsLength < newBottomPointsLength) {
   updateTop(newBottomPointsLength);
   for (int i = bottomPointsLength; i < newBottomPointsLength; i++) {
    updateSide(i, bottomPoints, bottomSegments);
   }
  }
  bottomPointsLength = newBottomPointsLength;
 }
 private void updateTop(int n) {
  GeoPolygon polygon = getTopFace();
  GeoPointND[] p = new GeoPointND[n];
  p[0] = getTopPoint();
  for (int i = 0; i < n - 1; i++) {
   p[1 + i] = getTopPoint(i + 1);
  }
  polygon.modifyInputPoints(p);
  polygon.setSegments(outputSegmentsTop.getOutput(new GeoSegment3D[n]));
  polygon.calcArea();
 }
 private void updateSide(int index, GeoPointND[] bottomPoints, GeoSegmentND[] bottomSegments) {
  outputSegmentsTop
    .getElement(index - 1)
    .modifyInputPoints(getTopPoint(index - 1), getTopPoint(index));
  GeoPolygon polygon = outputPolygonsSide.getElement(index - 1);
  GeoPointND[] p = new GeoPointND[4];
  p[0] = bottomPoints[index - 1];
  p[1] = bottomPoints[index];
  p[2] = getTopPoint(index);
  p[3] = getTopPoint(index - 1);
  polygon.modifyInputPoints(p); 
  GeoSegmentND[] s = new GeoSegmentND[4];
  s[0] = index <= bottomSegments.length ? bottomSegments[index - 1] : null;
  s[1] = outputSegmentsSide.getElement(index);
  s[2] = outputSegmentsTop.getElement(index - 1);
  s[3] = outputSegmentsSide.getElement(index - 1);
  polygon.setSegments(s);
  polygon.calcArea();
 }
 protected void removeBottomPoints(int length) {
  for (int i = bottomPointsLength; i < bottomPointsLength + length; i++) {
   outputPoints.getElement(i - getShift()).setUndefined();
  }
 }
 protected void updateOutputPoints() {
  if (height == null) {
   uptranslation =
     getTopPoint().getInhomCoordsInD3().sub(getBottomPoints()[0].getInhomCoordsInD3());
  } else {
   uptranslation = bottom.getMainDirection().normalized().mul(height.getDouble());
  }
  GeoPointND[] bottomPoints = getBottomPoints();
  if (bottomPoints != null) {
   for (int i = 0; i < outputPoints.size() && i + getShift() < bottomPoints.length; i++) {
    outputPoints
      .getElement(i)
      .setCoords(bottomPoints[i + getShift()].getInhomCoordsInD3().add(uptranslation), true);
   }
  }
 }
 public void compute() {
  if (!preCompute()) {
   for (int i = 0; i < bottomPointsLength - getShift(); i++) {
    outputPoints.getElement(i).setUndefined();
   }
   return;
  }
  if (!bottomAsInput) {
   updateOutputPoints();
  }
 }
 public Commands getClassName() {
  return Commands.Prism;
 }
 protected void updateOutput() {
  Collection<GeoPolygon3D> faces = polyhedron.getFacesCollection();
  int top = faces.size();
  int step = 1;
  for (GeoPolygon polygon : faces) {
   GeoSegmentND[] segments = polygon.getSegments();
   if (step == 1 && !bottomAsInput) { 
    outputPolygonsBottom.addOutput((GeoPolygon3D) polygon, false);
    for (int i = 0; i < segments.length; i++) {
     outputSegmentsBottom.addOutput((GeoSegment3D) segments[i], false);
    }
    step++;
    continue;
   } else if (step == top) { 
    outputPolygonsTop.addOutput((GeoPolygon3D) polygon, false);
    for (int i = 0; i < segments.length; i++) {
     outputSegmentsTop.addOutput((GeoSegment3D) segments[i], false);
    }
    step++;
    continue;
   }
   outputPolygonsSide.addOutput((GeoPolygon3D) polygon, false);
   addToOutputIf3D(outputSegmentsSide, polygon.getSegments()[3]);
   step++;
  }
  refreshOutput();
 }
 protected int getSideLengthFromLabelsLength(int length) {
  if (bottomAsInput) {
   return (length + getShift() - 2) / 4;
  }
  return (length + getShift() - 3) / 5;
 }
 protected void updateVolume(double heightVal) {
  getPolyhedron().setVolume(getBottom().getArea() * heightVal);
 }
 protected void updateDependentGeos() {
  super.updateDependentGeos();
  outputPoints.update();
  if (!getPolyhedron().allLabelsAreSet()) {
   outputSegmentsBottom.updateParentAlgorithm();
   outputSegmentsSide.updateParentAlgorithm();
   outputSegmentsTop.updateParentAlgorithm();
   outputPolygonsBottom.updateParentAlgorithm();
   outputPolygonsSide.updateParentAlgorithm();
   outputPolygonsTop.updateParentAlgorithm();
  }
 }
 protected void updateOutputSegmentsAndPolygonsParentAlgorithms() {
  outputSegmentsBottom.updateParentAlgorithm();
  outputSegmentsSide.updateParentAlgorithm();
  outputSegmentsTop.updateParentAlgorithm();
  outputPolygonsBottom.updateParentAlgorithm();
  outputPolygonsSide.updateParentAlgorithm();
  outputPolygonsTop.updateParentAlgorithm();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronPointsPrismForExtrusion.java
```java
public class AlgoPolyhedronPointsPrismForExtrusion extends AlgoPolyhedronPointsPrism
  implements AlgoForExtrusion {
 private ExtrusionComputer extrusionComputer;
 public AlgoPolyhedronPointsPrismForExtrusion(
   Construction c, String[] labels, GeoPolygon polygon, NumberValue height) {
  super(c, labels, polygon, height);
 }
 public void setExtrusionComputer(ExtrusionComputer extrusionComputer) {
  this.extrusionComputer = extrusionComputer;
 }
 public void compute() {
  super.compute();
  if (extrusionComputer != null) {
   extrusionComputer.compute();
  }
 }
 public GeoElement getGeoToHandle() {
  return getTopFace();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronPointsPyramid.java
```java
public class AlgoPolyhedronPointsPyramid extends AlgoPolyhedronPoints {
 private Coords bottomCenter;
 public AlgoPolyhedronPointsPyramid(Construction c, String[] labels, GeoPointND[] points) {
  super(c, labels, points);
 }
 public AlgoPolyhedronPointsPyramid(
   Construction c, String[] labels, GeoPolygon polygon, GeoPointND point) {
  super(c, labels, polygon, point);
 }
 public AlgoPolyhedronPointsPyramid(
   Construction c, String[] labels, GeoPolygon polygon, NumberValue height) {
  super(c, labels, polygon, height);
 }
 protected void createPolyhedron(GeoPointND[] bottomPoints) {
  setBottom(polyhedron);
  GeoPointND topPoint = getTopPoint();
  bottomPointsLength = bottomPoints.length;
  points = new GeoPointND[bottomPointsLength + 1];
  for (int i = 0; i < bottomPointsLength; i++) {
   points[i] = bottomPoints[i];
  }
  points[bottomPointsLength] = topPoint;
  for (int i = 0; i < bottomPointsLength; i++) {
   polyhedron.startNewFace();
   polyhedron.addPointToCurrentFace(bottomPoints[i]);
   polyhedron.addPointToCurrentFace(bottomPoints[(i + 1) % bottomPointsLength]);
   polyhedron.addPointToCurrentFace(topPoint); 
   polyhedron.endCurrentFace();
  }
 }
 protected GeoPolyhedron.Type getPolyhedronType() {
  return GeoPolyhedron.Type.PYRAMID;
 }
 protected void updateOutput(int newBottomPointsLength) {
  updateOutputPoints();
  GeoPointND[] bottomPoints = getBottomPoints();
  GeoSegmentND[] bottomSegments = getBottom().getSegments();
  int nOld = outputSegmentsSide.size();
  if (newBottomPointsLength > nOld) {
   polyhedron.updateSegmentsLinked();
   for (int i = nOld; i < newBottomPointsLength; i++) {
    polyhedron.startNewFace();
    polyhedron.addPointToCurrentFace(bottomPoints[i]);
    polyhedron.addPointToCurrentFace(bottomPoints[(i + 1) % newBottomPointsLength]);
    polyhedron.addPointToCurrentFace(getTopPoint());
    polyhedron.endCurrentFace();
    GeoPolygon3D polygon = polyhedron.createPolygon(i);
    outputPolygonsSide.addOutput(polygon, false);
    addToOutputIf3D(outputSegmentsSide, polygon.getSegments()[2]);
   }
   if (getPolyhedron().allLabelsAreSet()) {
    outputSegmentsSide.setLabels(null);
    outputPolygonsSide.setLabels(null);
   }
   refreshOutput();
  } else if (newBottomPointsLength < nOld) {
   GeoPolygon polygon = outputPolygonsSide.getElement(newBottomPointsLength - 1);
   GeoPointND[] p = new GeoPointND[3];
   p[0] = bottomPoints[newBottomPointsLength - 1];
   p[1] = bottomPoints[0];
   p[2] = getTopPoint();
   polygon.modifyInputPoints(p);
   GeoSegmentND[] s = new GeoSegmentND[3];
   if (bottomSegments.length > newBottomPointsLength - 1) {
    s[0] = bottomSegments[newBottomPointsLength - 1];
   }
   s[1] = outputSegmentsSide.getElement(newBottomPointsLength - 1);
   s[2] = outputSegmentsSide.getElement(0);
   polygon.setSegments(s);
   polygon.calcArea();
  }
  if (bottomPointsLength < newBottomPointsLength) {
   for (int i = bottomPointsLength; i < newBottomPointsLength; i++) {
    updateSide(i, bottomPoints, bottomSegments);
   }
  }
  bottomPointsLength = newBottomPointsLength;
 }
 private void updateSide(int index, GeoPointND[] bottomPoints, GeoSegmentND[] bottomSegments) {
  GeoPolygon polygon = outputPolygonsSide.getElement(index - 1);
  GeoPointND[] p = new GeoPointND[3];
  p[0] = bottomPoints[index - 1];
  p[1] = bottomPoints[index];
  p[2] = getTopPoint();
  polygon.modifyInputPoints(p);
  GeoSegmentND[] s = new GeoSegmentND[3];
  s[0] = index <= bottomSegments.length ? bottomSegments[index - 1] : null;
  s[1] = outputSegmentsSide.getElement(index);
  s[2] = outputSegmentsSide.getElement(index - 1);
  polygon.setSegments(s);
  polygon.calcArea();
 }
 protected void initCoords() {
  bottomCenter = new Coords(4);
 }
 protected void updateOutputPoints() {
  GeoPointND[] bottomPoints = getBottomPoints();
  if (bottomPoints == null) {
   return;
  }
  Coords bottomCenter1 = new Coords(4);
  for (int i = 0; i < bottomPoints.length; i++) {
   bottomCenter1 = bottomCenter1.add(bottomPoints[i].getInhomCoordsInD3());
  }
  bottomCenter = bottomCenter1.mul((double) 1 / bottomPoints.length);
  if (height != null) {
   Coords v = bottom.getMainDirection().normalized().mul(height.getDouble());
   getTopPoint().setCoords(bottomCenter.add(v), true);
  }
 }
 public void compute() {
  if (!preCompute()) {
   if (height != null) {
    getTopPoint().setUndefined();
   }
  }
 }
 public Commands getClassName() {
  return Commands.Pyramid;
 }
 protected void updateOutput() {
  Collection<GeoPolygon3D> faces = polyhedron.getFacesCollection();
  int step = 1;
  for (GeoPolygon polygon : faces) {
   GeoSegmentND[] segments = polygon.getSegments();
   if (step == 1 && !bottomAsInput) { 
    outputPolygonsBottom.addOutput((GeoPolygon3D) polygon, false);
    for (int i = 0; i < segments.length; i++) {
     outputSegmentsBottom.addOutput((GeoSegment3D) segments[i], false);
    }
    step++;
   } else { 
    outputPolygonsSide.addOutput((GeoPolygon3D) polygon, false);
    addToOutputIf3D(outputSegmentsSide, polygon.getSegments()[2]);
    step++;
   }
  }
  refreshOutput();
 }
 protected int getSideLengthFromLabelsLength(int length) {
  if (bottomAsInput) {
   return (length + getShift() - 2) / 2;
  }
  return (length + getShift() - 3) / 3;
 }
 protected void updateVolume(double heightVal) {
  getPolyhedron().setVolume(getBottom().getArea() * heightVal / 3);
 }
 protected void updateDependentGeos() {
  super.updateDependentGeos();
  if (height != null) {
   getTopPoint().update();
  }
  if (!getPolyhedron().allLabelsAreSet()) {
   outputSegmentsBottom.updateParentAlgorithm();
   outputSegmentsSide.updateParentAlgorithm();
   outputPolygonsBottom.updateParentAlgorithm();
   outputPolygonsSide.updateParentAlgorithm();
  }
 }
 protected void updateOutputSegmentsAndPolygonsParentAlgorithms() {
  outputSegmentsBottom.updateParentAlgorithm();
  outputSegmentsSide.updateParentAlgorithm();
  outputPolygonsBottom.updateParentAlgorithm();
  outputPolygonsSide.updateParentAlgorithm();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoPolyhedronPointsPyramidForExtrusion.java
```java
public class AlgoPolyhedronPointsPyramidForExtrusion extends AlgoPolyhedronPointsPyramid
  implements AlgoForExtrusion {
 private ExtrusionComputer extrusionComputer;
 public AlgoPolyhedronPointsPyramidForExtrusion(
   Construction c, String[] labels, GeoPolygon polygon, NumberValue height) {
  super(c, labels, polygon, height);
 }
 public void setExtrusionComputer(ExtrusionComputer extrusionComputer) {
  this.extrusionComputer = extrusionComputer;
 }
 public void compute() {
  super.compute();
  if (extrusionComputer != null) {
   extrusionComputer.compute();
  }
 }
 public GeoElement getGeoToHandle() {
  return outputPolygonsSide.getElement(0);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadric.java
```java
public abstract class AlgoQuadric extends AlgoElement3D {
 private GeoQuadric3D quadric;
 private GeoElementND secondInput;
 private GeoNumberValue number;
 private AlgoQuadricComputer computer;
 public AlgoQuadric(
   Construction c,
   GeoElementND secondInput,
   GeoNumberValue number,
   AlgoQuadricComputer computer) {
  this(c, secondInput, number, computer, true);
 }
 public AlgoQuadric(
   Construction c,
   GeoElementND secondInput,
   GeoNumberValue number,
   AlgoQuadricComputer computer,
   boolean addToConstructionList) {
  super(c, addToConstructionList);
  quadric = computer.newQuadric(c);
  this.number = number;
  this.secondInput = secondInput;
  this.computer = computer;
 }
 protected AlgoQuadricComputer getComputer() {
  return computer;
 }
 protected GeoElementND getSecondInput() {
  return secondInput;
 }
 protected GeoNumberValue getNumber() {
  return number;
 }
 protected abstract Coords getDirection();
 public GeoQuadric3D getQuadric() {
  return quadric;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricComputer.java
```java
public abstract class AlgoQuadricComputer {
 public GeoQuadric3D newQuadric(Construction c) {
  return new GeoQuadric3D(c);
 }
 public abstract void setQuadric(
   GeoQuadric3D quadric, Coords origin, Coords direction, Coords eigen, double r, double r2);
 public abstract double getNumber(double v);
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricComputerCone.java
```java
public class AlgoQuadricComputerCone extends AlgoQuadricComputer {
 public void setQuadric(
   GeoQuadric3D quadric, Coords origin, Coords direction, Coords eigen, double r, double r2) {
  quadric.setCone(origin, direction.normalize(), eigen, r, r2);
 }
 public double getNumber(double v) {
  double c = Math.cos(v);
  double s = Math.sin(v);
  if (c < 0 || s < 0) {
   return Double.NaN;
  } else if (DoubleUtil.isZero(c)) { 
   return Double.NaN;
  } else if (DoubleUtil.isZero(s)) { 
   return Double.NaN;
  }
  return s / c;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricComputerCylinder.java
```java
public class AlgoQuadricComputerCylinder extends AlgoQuadricComputer {
 public void setQuadric(
   GeoQuadric3D quadric, Coords origin, Coords direction, Coords eigen, double r, double r2) {
  quadric.setCylinder(origin, direction.normalize(), eigen, r, r2);
 }
 public double getNumber(double v) {
  if (DoubleUtil.isZero(v)) {
   return 0;
  } else if (v < 0) {
   return Double.NaN;
  }
  return v;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricComputerCylinderOpen.java
```java
public class AlgoQuadricComputerCylinderOpen extends AlgoQuadricComputerCylinder {
 public GeoQuadric3D newQuadric(Construction c) {
  return new GeoQuadric3DPart(c);
 }
 public void setQuadric(
   GeoQuadric3D quadric, Coords origin, Coords direction, Coords eigen, double r, double r2) {
  direction.calcNorm();
  double altitude = direction.getNorm();
  quadric.setCylinder(origin, direction.mul(1 / altitude), eigen, r, r2);
  quadric.setLimits(0, altitude);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricComputerSide.java
```java
public class AlgoQuadricComputerSide extends AlgoQuadricComputer {
 public GeoQuadric3D newQuadric(Construction c) {
  return new GeoQuadric3DPart(c);
 }
 public void setQuadric(
   GeoQuadric3D quadric, Coords origin, Coords direction, Coords eigen, double r, double r2) {
  quadric.set(origin, direction, eigen, r, r2);
 }
 public double getNumber(double v) {
  return 0;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricEnd.java
```java
public abstract class AlgoQuadricEnd extends AlgoElement3D {
 private GeoQuadric3DLimited quadric; 
 private GeoConic3D section; 
 private CoordSys coordsys;
 private CoordMatrix pm = new CoordMatrix(4, 3);
 private CoordMatrix pmt = new CoordMatrix(3, 4);
 private boolean isHelperAlgo = false;
 public AlgoQuadricEnd(Construction cons, GeoQuadric3DLimited quadric) {
  this(cons, quadric, false);
 }
 public AlgoQuadricEnd(Construction cons, GeoQuadric3DLimited quadric, boolean helper) {
  super(cons, !helper);
  this.quadric = quadric;
  section = new GeoConic3D(cons);
  coordsys = new CoordSys(2);
  section.setCoordSys(coordsys);
  section.setIsEndOfQuadric(true);
  if (!helper) {
   setInputOutput(new GeoElement[] {quadric}, new GeoElement[] {section});
  }
  compute();
 }
 public AlgoQuadricEnd(Construction cons, String label, GeoQuadric3DLimited quadric) {
  this(cons, quadric);
  section.setLabel(label);
 }
 public GeoConic3D getSection() {
  return section;
 }
 public final void compute() {
  if (!quadric.isDefined()) {
   section.setUndefined();
   return;
  }
  section.setDefined();
  if (quadric.getType() == GeoQuadricNDConstants.QUADRIC_PARABOLIC_CYLINDER) {
   Coords d = quadric.getEigenvec3D(1).normalize();
   Coords o1 = quadric.getMidpoint3D().copy().addInsideMul(d, quadric.getBottomParameter());
   Coords o2 = quadric.getMidpoint3D().copy().addInsideMul(d, quadric.getTopParameter());
   pm.setOrigin(getOrigin(o1, o2));
   Coords[] v = new Coords[3]; 
   v[2] = quadric.getEigenvec3D(2).normalize();
   v[0] = quadric.getEigenvec3D(0).normalize();
   v[1] = d;
   pm.setVx(v[0]);
   pm.setVy(v[2]);
   pm.transposeCopy(pmt);
   CoordMatrix qm = quadric.getSymmetricMatrix();
   CoordMatrix cm = pmt.mul(qm).mul(pm);
   coordsys.resetCoordSys();
   coordsys.addPoint(getOrigin(o1, o2));
   coordsys.addVector(v[0]);
   coordsys.addVector(getV1(v[2]));
   coordsys.makeOrthoMatrix(false, false);
   section.setMatrix(cm);
  } else {
   Coords d = quadric.getEigenvec3D(2);
   Coords o1 = quadric.getMidpoint3D().copy().addInsideMul(d, quadric.getBottomParameter());
   Coords o2 = quadric.getMidpoint3D().copy().addInsideMul(d, quadric.getTopParameter());
   if (quadric.getType() == GeoQuadricNDConstants.QUADRIC_CYLINDER
     || quadric.getType() == GeoQuadricNDConstants.QUADRIC_CONE) {
    if (DoubleUtil.isZero(quadric.getHalfAxis(0))
      && (Double.isNaN(quadric.getHalfAxis(1))
        || DoubleUtil.isZero(quadric.getHalfAxis(1)))) {
     section.setSinglePointAtCoords(getOrigin(o1, o2));
     return;
    }
   }
   pm.setOrigin(getOrigin(o1, o2));
   Coords[] v = new Coords[3]; 
   v[2] = d;
   v[0] = quadric.getEigenvec3D(0).normalize();
   v[1] = quadric.getEigenvec3D(1).normalize();
   pm.setVx(v[0]);
   pm.setVy(v[1]);
   pm.transposeCopy(pmt);
   CoordMatrix qm = quadric.getSymmetricMatrix();
   CoordMatrix cm = pmt.mul(qm).mul(pm);
   coordsys.resetCoordSys();
   coordsys.addPoint(getOrigin(o1, o2));
   coordsys.addVector(v[0]);
   coordsys.addVector(getV1(v[1]));
   coordsys.makeOrthoMatrix(false, false);
   section.setMatrix(cm);
  }
 }
 public void setIsHelperAlgo() {
  isHelperAlgo = true;
 }
 public void remove() {
  if (removed) {
   return;
  }
  super.remove();
  if (isHelperAlgo) {
   quadric.remove();
  }
 }
 protected abstract Coords getOrigin(Coords o1, Coords o2);
 protected abstract Coords getV1(Coords v1);
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricEndBottom.java
```java
public class AlgoQuadricEndBottom extends AlgoQuadricEnd {
 public AlgoQuadricEndBottom(Construction cons, String label, GeoQuadric3DLimited quadric) {
  super(cons, label, quadric);
 }
 protected Coords getOrigin(Coords o1, Coords o2) {
  return o1;
 }
 protected Coords getV1(Coords v1) {
  return v1.mul(-1);
 }
 public Commands getClassName() {
  return Commands.Bottom;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricEndTop.java
```java
public class AlgoQuadricEndTop extends AlgoQuadricEnd {
 public AlgoQuadricEndTop(Construction cons, String label, GeoQuadric3DLimited quadric) {
  super(cons, label, quadric);
 }
 public AlgoQuadricEndTop(Construction cons, GeoQuadric3DLimited quadric) {
  super(cons, quadric, true);
  setIsHelperAlgo();
 }
 protected Coords getOrigin(Coords o1, Coords o2) {
  return o2;
 }
 protected Coords getV1(Coords v1) {
  return v1;
 }
 public Commands getClassName() {
  return Commands.Top;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricEnds.java
```java
public class AlgoQuadricEnds extends AlgoElement3D {
 private GeoQuadricND quadric; 
 private GeoConic3D[] sections; 
 private CoordSys coordsys1;
 private CoordSys coordsys2;
 private CoordMatrix pm = new CoordMatrix(4, 3);
 private CoordMatrix pmt = new CoordMatrix(3, 4);
 private Coords o1 = new Coords(3);
 private Coords o2 = new Coords(3);
 private Coords v = new Coords(3);
 private Coords vn1 = new Coords(3);
 private Coords vn2 = new Coords(3);
 public AlgoQuadricEnds(Construction cons, String[] labels, GeoQuadricND quadric) {
  this(cons, quadric);
  if (labels == null) {
   sections[0].setLabel(null);
   sections[1].setLabel(null);
  } else if (labels.length == 1) {
   LabelManager.setLabels(labels[0], sections);
  } else {
   LabelManager.setLabels(labels, sections);
  }
 }
 public AlgoQuadricEnds(Construction cons, GeoQuadricND quadric) {
  this(cons, quadric, false);
 }
 public AlgoQuadricEnds(Construction cons, GeoQuadricND quadric, boolean helper) {
  super(cons, !helper);
  pm.set(4, 3, 1);
  this.quadric = quadric;
  sections = new GeoConic3D[2];
  sections[0] = new GeoConic3D(cons);
  coordsys1 = new CoordSys(2);
  sections[0].setCoordSys(coordsys1);
  sections[0].setIsEndOfQuadric(true);
  sections[1] = new GeoConic3D(cons);
  coordsys2 = new CoordSys(2);
  sections[1].setCoordSys(coordsys2);
  sections[1].setIsEndOfQuadric(true);
  if (!helper) {
   setInputOutput(new GeoElement[] {quadric}, sections);
  }
  compute();
 }
 public GeoConic3D getSection1() {
  return sections[0];
 }
 public GeoConic3D getSection2() {
  return sections[1];
 }
 public GeoConic3D[] getSections() {
  return sections;
 }
 public final void compute() {
  if (!quadric.isDefined()) {
   sections[0].setUndefined();
   sections[1].setUndefined();
   return;
  }
  sections[0].setDefined();
  sections[1].setDefined();
  o1.setAdd3(
    quadric.getMidpoint3D(),
    o1.setMul3(
      quadric.getEigenvec3D(2), ((GeoQuadric3DLimitedOrPart) quadric).getBottomParameter()));
  o2.setAdd3(
    quadric.getMidpoint3D(),
    o2.setMul3(
      quadric.getEigenvec3D(2), ((GeoQuadric3DLimitedOrPart) quadric).getTopParameter()));
  if (quadric.getType() == GeoQuadricNDConstants.QUADRIC_CYLINDER
    || quadric.getType() == GeoQuadricNDConstants.QUADRIC_CONE) {
   if (DoubleUtil.isZero(quadric.getHalfAxis(0))
     && (Double.isNaN(quadric.getHalfAxis(1)) || DoubleUtil.isZero(quadric.getHalfAxis(1)))) {
    sections[0].setSinglePointAtCoords(o1);
    sections[1].setSinglePointAtCoords(o2);
    return;
   }
  }
  CoordMatrix qm = quadric.getSymmetricMatrix();
  pm.setOrigin(o1);
  v.setSub3(o2, o1);
  v.completeOrthonormal3(vn1, vn2);
  pm.setVx(vn1);
  pm.setVy(vn2);
  pm.transposeCopy(pmt);
  CoordMatrix cm = pmt.mul(qm).mul(pm);
  coordsys1.resetCoordSys();
  coordsys1.addPoint(o1);
  coordsys1.addVector(vn1);
  coordsys1.addVector(v.setMul3(vn2, -1)); 
  coordsys1.makeOrthoMatrix(false, false);
  sections[0].setMatrix(cm);
  pm.setOrigin(o2);
  pm.transposeCopy(pmt);
  cm = pmt.mul(qm).mul(pm);
  coordsys2.resetCoordSys();
  coordsys2.addPoint(o2);
  coordsys2.addVector(vn1);
  coordsys2.addVector(vn2);
  coordsys2.makeOrthoMatrix(false, false);
  sections[1].setMatrix(cm);
 }
 public Commands getClassName() {
  return Commands.Ends;
 }
 public void remove() {
  if (removed) {
   return;
  }
  super.remove();
  quadric.remove();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricLimitedConicHeight.java
```java
public abstract class AlgoQuadricLimitedConicHeight extends AlgoElement3D {
 private GeoConicND bottom;
 private NumberValue height;
 private GeoQuadric3DPart side;
 protected GeoConic3D top;
 private GeoQuadric3DLimited quadric;
 private AlgoQuadricSide algoSide;
 private AlgoQuadricEndTop algoTop;
 public AlgoQuadricLimitedConicHeight(
   Construction c, String[] labels, GeoConicND bottom, GeoNumberValue height, int type) {
  super(c);
  this.bottom = bottom;
  this.height = height;
  quadric = new GeoQuadric3DLimited(c, type);
  input = new GeoElement[] {bottom, (GeoElement) height};
  bottom.addAlgorithm(this);
  height.addAlgorithm(this);
  quadric.setParentAlgorithm(this);
  cons.addToAlgorithmList(this);
  setQuadric();
  algoSide = new AlgoQuadricSide(cons, quadric, true, bottom);
  side = (GeoQuadric3DPart) algoSide.getQuadric();
  side.setParentAlgorithm(this);
  side.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
  quadric.setSide(side);
  createTop();
  quadric.setBottomTop(bottom, top);
  setOutput();
  quadric.initLabelsNoBottom(labels);
  quadric.updatePartsVisualStyle();
  if (height instanceof GeoNumeric) {
   if (height.isIndependent()) {
    side.setChangeableParent((GeoNumeric) height, bottom, new ExtrudeConverter(), quadric);
    top.setChangeableParent((GeoNumeric) height, bottom, new ExtrudeConverter(), quadric);
   }
  }
 }
 protected final void createTop() {
  algoTop = new AlgoQuadricEndTop(cons, getQuadric());
  top = algoTop.getSection();
  top.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
  top.setParentAlgorithm(this);
 }
 protected final void setOutput() {
  setOutput(
    new GeoElement[] {getQuadric(), getQuadric().getTop(), getQuadric().getSide()});
 }
 private void setQuadric() {
  Coords o = bottom.getMidpoint3D();
  double r = bottom.getHalfAxis(0);
  double r2 = bottom.getHalfAxis(1);
  double altitude = height.getDouble();
  Coords d = bottom.getMainDirection().normalize();
  Coords o2 = o.add(d.mul(altitude));
  quadric.setDefined();
  setQuadric(o, o2, d, bottom.getEigenvec3D(0), r, r2, 0, altitude);
 }
 public void compute() {
  setQuadric();
  algoSide.compute();
  algoTop.compute();
  quadric.calcVolume();
 }
 protected abstract void setQuadric(
   Coords o1, Coords o2, Coords d, Coords eigen, double r, double r2, double min, double max);
 public GeoQuadric3DLimited getQuadric() {
  return quadric;
 }
 protected void getOutputXML(XMLStringBuilder sb) {
  super.getOutputXML(sb);
  if (bottom.isLabelSet()) {
   bottom.getXML(false, sb);
  }
 }
 public void setOutputPointsEuclidianVisible(boolean visible) {
 }
 public void notifyUpdateOutputPoints() {
 }
 public GeoElement getTopFace() {
  return top;
 }
 public GeoConicND getBottomFace() {
  return bottom;
 }
 public void setOutputOtherEuclidianVisible(boolean b) {
  side.setEuclidianVisible(b);
  top.setEuclidianVisible(b);
 }
 public void notifyUpdateOutputOther() {
  getKernel().notifyUpdate(side);
  getKernel().notifyUpdate(top);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricLimitedConicHeightCone.java
```java
public class AlgoQuadricLimitedConicHeightCone extends AlgoQuadricLimitedConicHeight {
 public AlgoQuadricLimitedConicHeightCone(
   Construction c, String[] labels, GeoConicND bottom, GeoNumberValue height) {
  super(c, labels, bottom, height, GeoQuadricNDConstants.QUADRIC_CONE);
 }
 protected void setQuadric(
   Coords o1, Coords o2, Coords d, Coords eigen, double r, double r2, double min, double max) {
  getQuadric().setCone(o2, d, r / max, -max, 0);
 }
 public Commands getClassName() {
  return Commands.Cone;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricLimitedConicHeightConeForExtrusion.java
```java
public class AlgoQuadricLimitedConicHeightConeForExtrusion extends AlgoQuadricLimitedConicHeightCone
  implements AlgoForExtrusion {
 private ExtrusionComputer extrusionComputer;
 public AlgoQuadricLimitedConicHeightConeForExtrusion(
   Construction c, String[] labels, GeoConicND bottom, GeoNumberValue height) {
  super(c, labels, bottom, height);
 }
 public void setExtrusionComputer(ExtrusionComputer extrusionComputer) {
  this.extrusionComputer = extrusionComputer;
 }
 public void compute() {
  super.compute();
  if (extrusionComputer != null) {
   extrusionComputer.compute();
  }
 }
 public GeoElement getGeoToHandle() {
  return getTopFace();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricLimitedConicHeightCylinder.java
```java
public class AlgoQuadricLimitedConicHeightCylinder extends AlgoQuadricLimitedConicHeight {
 public AlgoQuadricLimitedConicHeightCylinder(
   Construction c, String[] labels, GeoConicND bottom, GeoNumberValue height) {
  super(c, labels, bottom, height, getExtrusionType(bottom));
 }
 private static int getExtrusionType(GeoConicND type) {
  switch (type.getType()) {
   case GeoConicNDConstants.CONIC_HYPERBOLA:
    return GeoQuadricNDConstants.QUADRIC_HYPERBOLIC_CYLINDER;
   case GeoConicNDConstants.CONIC_PARABOLA:
    return GeoQuadricNDConstants.QUADRIC_PARABOLIC_CYLINDER;
   case GeoConicNDConstants.CONIC_DOUBLE_LINE:
    return GeoQuadricNDConstants.QUADRIC_PLANE;
   case GeoConicNDConstants.CONIC_INTERSECTING_LINES:
    return GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES;
   default:
    return GeoQuadricNDConstants.QUADRIC_CYLINDER;
  }
 }
 protected void setQuadric(
   Coords o1, Coords o2, Coords d, Coords eigen, double r, double r2, double min, double max) {
  switch (getExtrusionType(getBottomFace())) {
   default:
    break;
   case GeoQuadricNDConstants.QUADRIC_CYLINDER:
    getQuadric().setCylinder(o1, d, r, min, max);
    break;
   case GeoQuadricNDConstants.QUADRIC_HYPERBOLIC_CYLINDER:
    getQuadric().setHyperbolicCylinder(o1, d, r, min, max);
    break;
   case GeoQuadricNDConstants.QUADRIC_PARABOLIC_CYLINDER:
    getQuadric().setParabolicCylinder(o1, d, r, min, max);
    break;
  }
 }
 public Commands getClassName() {
  return Commands.Cylinder;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricLimitedConicHeightCylinderForExtrusion.java
```java
public class AlgoQuadricLimitedConicHeightCylinderForExtrusion
  extends AlgoQuadricLimitedConicHeightCylinder implements AlgoForExtrusion {
 private ExtrusionComputer extrusionComputer;
 public AlgoQuadricLimitedConicHeightCylinderForExtrusion(
   Construction c, String[] labels, GeoConicND bottom, GeoNumberValue height) {
  super(c, labels, bottom, height);
 }
 public void setExtrusionComputer(ExtrusionComputer extrusionComputer) {
  this.extrusionComputer = extrusionComputer;
 }
 public void compute() {
  super.compute();
  if (extrusionComputer != null) {
   extrusionComputer.compute();
  }
 }
 public GeoElement getGeoToHandle() {
  return getTopFace();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricLimitedPointPointRadius.java
```java
public abstract class AlgoQuadricLimitedPointPointRadius extends AlgoElement3D {
 private GeoPointND origin;
 private GeoPointND secondPoint;
 private NumberValue radius;
 private GeoQuadric3DPart side;
 protected GeoConic3D bottom;
 protected GeoConic3D top;
 private GeoQuadric3DLimited quadric;
 private AlgoQuadricSide algoSide;
 private AlgoQuadricEnds algoEnds;
 public AlgoQuadricLimitedPointPointRadius(
   Construction c,
   String[] labels,
   GeoPointND origin,
   GeoPointND secondPoint,
   GeoNumberValue r,
   int type) {
  super(c);
  this.origin = origin;
  this.secondPoint = secondPoint;
  this.radius = r;
  quadric = new GeoQuadric3DLimited(c, type);
  input = new GeoElement[] {(GeoElement) origin, (GeoElement) secondPoint, (GeoElement) r};
  origin.addAlgorithm(this);
  secondPoint.addAlgorithm(this);
  r.addAlgorithm(this);
  quadric.setParentAlgorithm(this);
  cons.addToAlgorithmList(this);
  setQuadric();
  algoSide = new AlgoQuadricSide(cons, quadric, true, null);
  cons.removeFromConstructionList(algoSide);
  side = (GeoQuadric3DPart) algoSide.getQuadric();
  side.setParentAlgorithm(this);
  quadric.setSide(side);
  algoEnds = createEnds();
  bottom.setParentAlgorithm(this);
  top.setParentAlgorithm(this);
  quadric.setBottomTop(bottom, top);
  side.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
  bottom.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
  top.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
  setOutput();
  quadric.initLabelsIncludingBottom(labels);
  quadric.updatePartsVisualStyle();
  update();
 }
 protected abstract void setOutput();
 protected abstract AlgoQuadricEnds createEnds();
 private void computeHelpers() {
  algoSide.compute();
  algoEnds.compute();
 }
 private boolean setQuadric() {
  if (!origin.isDefined()
    || origin.isInfinite()
    || !secondPoint.isDefined()
    || secondPoint.isInfinite()
    || !radius.isDefined()) {
   getQuadric().setUndefined();
   return false;
  }
  Coords o = origin.getInhomCoordsInD3();
  Coords o2 = secondPoint.getInhomCoordsInD3();
  Coords d = o2.sub(o);
  if (d.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   getQuadric().setUndefined();
   return false;
  }
  double r = radius.getDouble();
  d.calcNorm();
  double altitude = d.getNorm();
  quadric.setDefined();
  setQuadric(o, o2, d.mul(1 / altitude), r, 0, altitude);
  return true;
 }
 public void compute() {
  if (!setQuadric()) {
   bottom.setUndefined();
   top.setUndefined();
   side.setUndefined();
   return;
  }
  computeHelpers();
  quadric.calcVolume();
 }
 protected abstract void setQuadric(
   Coords o1, Coords o2, Coords d, double r, double min, double max);
 public GeoQuadric3DLimited getQuadric() {
  return quadric;
 }
 protected abstract AlgoElement getTransformedAlgo(
   String[] labels, GeoPointND p1, GeoPointND p2, GeoNumeric r);
 public GeoElement[] getTransformedOutput(Transform t) {
  GeoPointND p1 = (GeoPointND) t.transform(origin, Transform.transformedGeoLabel(origin))[0];
  GeoPointND p2 =
    (GeoPointND) t.transform(secondPoint, Transform.transformedGeoLabel(secondPoint))[0];
  Transform.setVisualStyleForTransformations((GeoElement) origin, (GeoElement) p1);
  Transform.setVisualStyleForTransformations((GeoElement) secondPoint, (GeoElement) p2);
  GeoNumeric r = new AlgoRadius(this.cons, getQuadric().getBottom()).getRadius();
  r.setLabel(null);
  r.setAuxiliaryObject(true);
  GeoElement[] output = getOutput();
  String[] labels = new String[output.length];
  for (int i = 0; i < output.length; i++) {
   labels[i] = Transform.transformedGeoLabel(output[i]);
  }
  AlgoElement algo = getTransformedAlgo(labels, p1, p2, r);
  GeoElement[] ret = algo.getOutput();
  for (int i = 0; i < ret.length; i++) {
   Transform.setVisualStyleForTransformations(output[i], ret[i]);
  }
  algo.update();
  return ret;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricLimitedPointPointRadiusCone.java
```java
public class AlgoQuadricLimitedPointPointRadiusCone extends AlgoQuadricLimitedPointPointRadius {
 public AlgoQuadricLimitedPointPointRadiusCone(
   Construction c,
   String[] labels,
   GeoPointND origin,
   GeoPointND secondPoint,
   GeoNumberValue r) {
  super(c, labels, origin, secondPoint, r, GeoQuadricNDConstants.QUADRIC_CONE);
 }
 protected AlgoQuadricEnds createEnds() {
  getQuadric().setSilentTop();
  AlgoQuadricEnds algo2 = new AlgoQuadricEnds(cons, getQuadric(), true);
  bottom = algo2.getSection1();
  top = algo2.getSection2();
  return algo2;
 }
 protected void setOutput() {
  setOutput(
    new GeoElement[] {getQuadric(), getQuadric().getBottom(), getQuadric().getSide()});
 }
 protected void setQuadric(Coords o1, Coords o2, Coords d, double r, double min, double max) {
  getQuadric().setCone(o2, d, r / max, -max, 0);
 }
 public Commands getClassName() {
  return Commands.Cone;
 }
 protected AlgoElement getTransformedAlgo(
   String[] labels, GeoPointND p1, GeoPointND p2, GeoNumeric r) {
  return new AlgoQuadricLimitedPointPointRadiusCone(this.cons, labels, p1, p2, r);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricLimitedPointPointRadiusCylinder.java
```java
public class AlgoQuadricLimitedPointPointRadiusCylinder extends AlgoQuadricLimitedPointPointRadius {
 public AlgoQuadricLimitedPointPointRadiusCylinder(
   Construction c,
   String[] labels,
   GeoPointND origin,
   GeoPointND secondPoint,
   GeoNumberValue r) {
  super(c, labels, origin, secondPoint, r, GeoQuadricNDConstants.QUADRIC_CYLINDER);
 }
 protected AlgoQuadricEnds createEnds() {
  AlgoQuadricEnds algo2 = new AlgoQuadricEnds(cons, getQuadric(), true);
  bottom = algo2.getSection1();
  top = algo2.getSection2();
  return algo2;
 }
 protected void setOutput() {
  setOutput(new GeoElement[] {
   getQuadric(),
   getQuadric().getBottom(),
   getQuadric().getTop(),
   getQuadric().getSide()
  });
 }
 protected void setQuadric(Coords o1, Coords o2, Coords d, double r, double min, double max) {
  getQuadric().setCylinder(o1, d, r, min, max);
 }
 public Commands getClassName() {
  return Commands.Cylinder;
 }
 protected AlgoElement getTransformedAlgo(
   String[] labels, GeoPointND p1, GeoPointND p2, GeoNumeric r) {
  return new AlgoQuadricLimitedPointPointRadiusCylinder(this.cons, labels, p1, p2, r);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricPointNumber.java
```java
public abstract class AlgoQuadricPointNumber extends AlgoQuadric {
 private GeoPointND origin;
 public AlgoQuadricPointNumber(
   Construction c,
   String label,
   GeoPointND origin,
   GeoElementND secondInput,
   GeoNumberValue r,
   AlgoQuadricComputer computer) {
  super(c, secondInput, r, computer);
  this.origin = origin;
  setInputOutput(
    new GeoElement[] {(GeoElement) origin, (GeoElement) secondInput, (GeoElement) r},
    new GeoElement[] {getQuadric()});
  compute();
  getQuadric().setLabel(label);
 }
 public void compute() {
  if (!origin.isDefined() || origin.isInfinite()) {
   getQuadric().setUndefined();
   return;
  }
  Coords d = getDirection();
  if (d.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   getQuadric().setUndefined();
   return;
  }
  double r = getComputer().getNumber(getNumber().getDouble());
  if (Double.isNaN(r)) {
   getQuadric().setUndefined();
   return;
  }
  getQuadric().setDefined();
  getComputer().setQuadric(getQuadric(), origin.getInhomCoordsInD3(), d, null, r, r);
 }
 protected GeoPointND getOrigin() {
  return origin;
 }
 protected abstract String getPlainName();
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricPointPointNumber.java
```java
public abstract class AlgoQuadricPointPointNumber extends AlgoQuadricPointNumber {
 public AlgoQuadricPointPointNumber(
   Construction c,
   String label,
   GeoPointND origin,
   GeoPointND secondPoint,
   GeoNumberValue r,
   AlgoQuadricComputer computer) {
  super(c, label, origin, secondPoint, r, computer);
 }
 protected Coords getDirection() {
  return ((GeoPointND) getSecondInput())
    .getInhomCoordsInD3()
    .sub(getOrigin().getInhomCoordsInD3());
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      getPlainName(),
      getOrigin().getLabel(tpl),
      getSecondInput().getLabel(tpl),
      getNumber().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricPointVectorNumber.java
```java
public abstract class AlgoQuadricPointVectorNumber extends AlgoQuadricPointNumber {
 public AlgoQuadricPointVectorNumber(
   Construction c,
   String label,
   GeoPointND origin,
   GeoVectorND direction,
   GeoNumberValue r,
   AlgoQuadricComputer computer) {
  super(c, label, origin, direction, r, computer);
 }
 protected Coords getDirection() {
  return ((GeoVectorND) getSecondInput()).getCoordsInD3();
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      getPlainName(),
      getOrigin().getLabel(tpl),
      getSecondInput().getLabel(tpl),
      getNumber().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoQuadricSide.java
```java
public class AlgoQuadricSide extends AlgoQuadric {
 private boolean isHelperAlgo;
 private GeoConicND bottom;
 public AlgoQuadricSide(
   Construction c, GeoQuadric3DLimited inputQuadric, boolean isHelperAlgo, GeoConicND bottom) {
  super(c, inputQuadric, null, new AlgoQuadricComputerSide(), !isHelperAlgo);
  this.isHelperAlgo = isHelperAlgo;
  this.bottom = bottom;
  if (!isHelperAlgo) {
   setInputOutput(new GeoElement[] {inputQuadric}, new GeoElement[] {getQuadric()});
  }
  compute();
 }
 public GeoQuadric3DLimited getInputQuadric() {
  return (GeoQuadric3DLimited) getSecondInput();
 }
 public void compute() {
  if (!getInputQuadric().isDefined()) {
   getQuadric().setUndefined();
   return;
  }
  double r1 = getInputQuadric().getRadius(), r2;
  Coords eigen = null;
  if (bottom == null) {
   r2 = r1;
  } else {
   r2 = bottom.getType() == GeoConicNDConstants.CONIC_PARABOLA
     ? bottom.p
     : r1 * bottom.getHalfAxis(1) / bottom.getHalfAxis(0);
   eigen = bottom.getEigenvec3D(0).normalize();
  }
  getQuadric().setDefined();
  getQuadric().setType(getInputQuadric().getType());
  getComputer()
    .setQuadric(
      getQuadric(),
      getInputQuadric().getOrigin(),
      getInputQuadric().getDirection(),
      eigen,
      r1,
      r2);
  getQuadric()
    .setLimits(getInputQuadric().getBottomParameter(), getInputQuadric().getTopParameter());
  ((GeoQuadric3DPart) getQuadric()).calcArea();
 }
 public void remove() {
  if (removed) {
   return;
  }
  super.remove();
  if (isHelperAlgo) {
   getInputQuadric().remove();
  }
 }
 protected Coords getDirection() {
  return null;
 }
 public Commands getClassName() {
  return Commands.QuadricSide;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoRayPointVector3D.java
```java
public class AlgoRayPointVector3D extends AlgoLinePointVector3D {
 public AlgoRayPointVector3D(Construction cons, GeoPointND point, GeoVectorND v) {
  super(cons, point, v);
 }
 public Commands getClassName() {
  return Commands.Ray;
 }
 protected GeoLine3D createLine(Construction cons1) {
  return new GeoRay3D(cons1, getPoint());
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      "RayThroughAWithDirectionB",
      getPoint().getLabel(tpl),
      getInputParallel().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoRotate3D.java
```java
public abstract class AlgoRotate3D extends AlgoTransformation {
 protected RotatableND out;
 protected GeoNumberValue angle;
 public AlgoRotate3D(Construction cons, GeoElement in, GeoNumberValue angle) {
  super(cons);
  this.inGeo = in;
  this.angle = angle;
  outGeo = getResultTemplate(inGeo);
  if (!(outGeo instanceof GeoList)) {
   out = (RotatableND) outGeo;
  }
 }
 protected void setOutput() {
  setOnlyOutput(outGeo);
  setDependencies(); 
 }
 public GeoElement getResult() {
  return outGeo;
 }
 protected void setTransformedObject(GeoElement g, GeoElement g2) {
  inGeo = g;
  outGeo = g2;
  if (!(outGeo instanceof GeoList)) {
   out = (RotatableND) outGeo;
  }
 }
 protected GeoElement getResultTemplate(GeoElement geo) {
  if (geo instanceof GeoFunction || geo instanceof GeoCurveCartesian) {
   return new GeoCurveCartesian3D(cons);
  }
  return super.getResultTemplate(geo);
 }
 protected GeoElement copy(GeoElement geo) {
  return kernel.copy3D(geo);
 }
 protected GeoElement copyInternal(Construction consCopy, GeoElement geo) {
  return kernel.copyInternal3D(consCopy, geo);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoRotate3DLine.java
```java
public class AlgoRotate3DLine extends AlgoRotate3D {
 private GeoLineND line;
 AlgoRotate3DLine(
   Construction cons, String label, GeoElement in, GeoNumberValue angle, GeoLineND line) {
  this(cons, in, angle, line);
  out.setLabel(label);
 }
 public AlgoRotate3DLine(Construction cons, GeoElement in, GeoNumberValue angle, GeoLineND line) {
  super(cons, in, angle);
  this.line = line;
  setInputOutput();
  compute();
 }
 public Commands getClassName() {
  return Commands.Rotate;
 }
 protected void setInputOutput() {
  input = new GeoElement[3];
  input[0] = inGeo;
  input[1] = angle.toGeoElement();
  input[2] = (GeoElement) line;
  setOutput();
 }
 public final void compute() {
  if (inGeo.isGeoList()) {
   transformList((GeoList) inGeo, (GeoList) outGeo);
   return;
  }
  if (inGeo instanceof GeoFunction) {
   AlgoTransformation3D.toGeoCurveCartesian(
     kernel, (GeoFunction) inGeo, (GeoCurveCartesian3D) outGeo);
  } else if (inGeo instanceof GeoFunctionNVar) {
   AlgoTransformation3D.toGeoSurfaceCartesian(
     kernel, (GeoFunctionNVar) inGeo, (GeoSurfaceCartesian3D) outGeo);
  } else {
   setOutGeo();
  }
  if (!outGeo.isDefined()) {
   return;
  }
  out.rotate(angle, line.getStartInhomCoords(), line);
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain(
      "ARotatedByAngleBAboutC", inGeo.getLabel(tpl), angle.getLabel(tpl), line.getLabel(tpl));
 }
 protected GeoElement getResultTemplate(GeoElement geo) {
  if (geo instanceof GeoFunctionNVar) {
   return new GeoSurfaceCartesian3D(cons);
  }
  return super.getResultTemplate(geo);
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_ROTATE_AROUND_LINE;
 }
 public double getAreaScaleFactor() {
  return 1;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoRotate3DPointOrientation.java
```java
public class AlgoRotate3DPointOrientation extends AlgoRotate3D {
 private GeoPointND center;
 private GeoDirectionND orientation;
 AlgoRotate3DPointOrientation(
   Construction cons,
   String label,
   GeoElement in,
   GeoNumberValue angle,
   GeoPointND center,
   GeoDirectionND orientation) {
  this(cons, in, angle, center, orientation);
  out.setLabel(label);
 }
 public AlgoRotate3DPointOrientation(
   Construction cons,
   GeoElement in,
   GeoNumberValue angle,
   GeoPointND center,
   GeoDirectionND orientation) {
  super(cons, in, angle);
  this.center = center;
  this.orientation = orientation;
  setInputOutput();
  compute();
 }
 public Commands getClassName() {
  return Commands.Rotate;
 }
 protected void setInputOutput() {
  input = new GeoElement[4];
  input[0] = inGeo;
  input[1] = angle.toGeoElement();
  input[2] = (GeoElement) center;
  input[3] = (GeoElement) orientation;
  setOutput();
 }
 public final void compute() {
  if (inGeo.isGeoList()) {
   transformList((GeoList) inGeo, (GeoList) outGeo);
   return;
  }
  if (inGeo instanceof GeoFunction) {
   AlgoTransformation3D.toGeoCurveCartesian(
     kernel, (GeoFunction) inGeo, (GeoCurveCartesian3D) outGeo);
  } else {
   setOutGeo();
  }
  if (!outGeo.isDefined()) {
   return;
  }
  out.rotate(angle, center.getInhomCoordsInD3(), orientation);
 }
 public final String toString(StringTemplate tpl) {
  String s;
  if (orientation instanceof GeoCoordSys2D) { 
   s = "ARotatedByAngleBAboutPlaneCThroughD";
  } else { 
   s = "ARotatedByAngleBAboutCThroughD";
  }
  return getLoc()
    .getPlain(
      s,
      inGeo.getLabel(tpl),
      angle.getLabel(tpl),
      orientation.getLabel(tpl),
      center.getLabel(tpl));
 }
 public double getAreaScaleFactor() {
  return 1;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoSemicircle3D.java
```java
public class AlgoSemicircle3D extends AlgoElement {
 private GeoPointND A; 
 private GeoPointND B; 
 private GeoDirectionND orientation; 
 private GeoConicPart3D conicPart; 
 private PathParameter param;
 private GeoPointND M; 
 private GeoConic3D conic;
 private Coords p2d;
 public AlgoSemicircle3D(
   Construction cons, String label, GeoPointND A, GeoPointND B, GeoDirectionND orientation) {
  this(cons, A, B, orientation);
  conicPart.setLabel(label);
 }
 public AlgoSemicircle3D(
   Construction cons, GeoPointND A, GeoPointND B, GeoDirectionND orientation) {
  super(cons);
  p2d = new Coords(4);
  this.A = A;
  this.B = B;
  this.orientation = orientation;
  AlgoMidpointND algom;
  if (A.isGeoElement3D() || B.isGeoElement3D()) {
   algom = new AlgoMidpoint3D(cons, A, B);
  } else {
   algom = new AlgoMidpoint(cons, (GeoPoint) A, (GeoPoint) B);
  }
  cons.removeFromConstructionList(algom);
  M = algom.getPoint();
  AlgoCircle3DPointPointDirection algo =
    new AlgoCircle3DPointPointDirection(cons, M, B, orientation);
  cons.removeFromConstructionList(algo);
  conic = algo.getCircle();
  conicPart = new GeoConicPart3D(cons, GeoConicNDConstants.CONIC_PART_ARC);
  conicPart.addPointOnConic(A);
  conicPart.addPointOnConic(B);
  param = new PathParameter();
  setInputOutput(); 
  compute();
 }
 public Commands getClassName() {
  return Commands.Semicircle;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_SEMICIRCLE;
 }
 protected void setInputOutput() {
  input = new GeoElement[3];
  input[0] = (GeoElement) A;
  input[1] = (GeoElement) B;
  input[2] = (GeoElement) orientation;
  setOnlyOutput(conicPart);
  setDependencies();
 }
 public GeoConicPart3D getSemicircle() {
  return conicPart;
 }
 public void compute() {
  if (!conic.isDefined()) {
   conicPart.setUndefined();
   return;
  }
  B.getInhomCoordsInD3()
    .projectPlaneInPlaneCoords(conic.getCoordSys().getMatrixOrthonormal(), p2d);
  p2d.setZ(1);
  conic.pointChanged(p2d, param);
  conicPart.set(conic);
  conicPart.setParameters(param.t, param.t + Math.PI, true);
 }
 public final String toString(StringTemplate tpl) {
  return getLoc().getPlain("SemicircleThroughAandB", A.getLabel(tpl), B.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoSpherePointRadius.java
```java
public class AlgoSpherePointRadius extends AlgoSphereNDPointRadius {
 public AlgoSpherePointRadius(Construction cons, GeoPointND M, GeoNumberValue r) {
  super(cons, M, r);
 }
 protected GeoQuadricND createSphereND(Construction cons1) {
  return new GeoQuadric3D(cons1);
 }
 public Commands getClassName() {
  return Commands.Sphere;
 }
 public GeoQuadric3D getSphere() {
  return (GeoQuadric3D) getSphereND();
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain("SphereWithCenterAandRadiusB", getM().getLabel(tpl), getRGeo().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoSphereTwoPoints.java
```java
public class AlgoSphereTwoPoints extends AlgoSphereNDTwoPoints {
 public AlgoSphereTwoPoints(Construction cons, GeoPointND M, GeoPointND P) {
  super(cons, M, P);
 }
 protected GeoQuadricND createSphereND(Construction cons1) {
  GeoQuadric3D sphere = new GeoQuadric3D(cons1);
  return sphere;
 }
 public Commands getClassName() {
  return Commands.Sphere;
 }
 public GeoQuadric3D getSphere() {
  return (GeoQuadric3D) getSphereND();
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlain("SphereThroughAwithCenterB", getP().getLabel(tpl), getM().getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoSurfaceOfRevolution.java
```java
public class AlgoSurfaceOfRevolution extends AlgoElement {
 private ParametricCurve function; 
 private GeoNumberValue angle; 
 private GeoSurfaceCartesian3D surface; 
 private GeoLineND line;
 private FunctionVariable[] funVar;
 private Path path;
 private double[] min;
 private double[] max;
 public AlgoSurfaceOfRevolution(Construction cons, Parametrizable function, GeoNumberValue angle) {
  this(cons, function, angle, null);
 }
 public AlgoSurfaceOfRevolution(
   Construction cons, Path path, GeoNumberValue angle, GeoLineND line) {
  super(cons);
  if (path instanceof ParametricCurve) {
   this.function = (ParametricCurve) path;
  } else {
   GeoCurveCartesianND gc = kernel.getGeoFactory().newCurve(path.isGeoElement3D() ? 3 : 2, cons);
   this.function = gc;
  }
  this.angle = angle;
  this.line = line == null ? kernel.getXAxis() : line;
  this.path = path;
  min = new double[2];
  max = new double[2];
  min[1] = 0;
  this.funVar = new FunctionVariable[2];
  funVar[0] = new FunctionVariable(kernel, "u");
  funVar[1] = new FunctionVariable(kernel, "v");
  FunctionNVar[] fun = new FunctionNVar[3];
  fun[0] = new FunctionNVar(funVar[0].wrap(), funVar);
  fun[1] = new FunctionNVar(funVar[0].wrap(), funVar);
  fun[2] = new FunctionNVar(funVar[0].wrap(), funVar);
  surface = createSurface(cons, fun);
  if (path instanceof ParametricCurve && ((ParametricCurve) path).isFunctionInX()) {
   surface.setIsSurfaceOfRevolutionAroundOx(true);
  }
  GeoNumeric changeableAngle = ChangeableParent.getGeoNumeric(angle);
  if (changeableAngle != null) {
   ChangeableParent changeableParent = new ChangeableParent(
     changeableAngle, this.line, new RotationConverter(this.line), surface);
   surface.setChangeableParent(changeableParent);
  }
  setInputOutput(); 
  compute();
  cons.registerEuclidianViewCE(this);
 }
 protected GeoSurfaceCartesian3D createSurface(Construction cons1, FunctionNVar[] fun) {
  return new GeoSurfaceCartesian3D(cons1, null, fun);
 }
 public Commands getClassName() {
  return Commands.Surface;
 }
 protected void setInputOutput() {
  input = new GeoElement[3];
  input[0] = path.toGeoElement();
  input[1] = (GeoElement) angle;
  input[2] = line.toGeoElement();
  setOnlyOutput(surface);
  setDependencies(); 
 }
 public GeoSurfaceCartesianND getSurface() {
  return surface;
 }
 public final void compute() {
  if (path instanceof Parametrizable) {
   ((Parametrizable) path).toGeoCurveCartesian((GeoCurveCartesianND) function);
  }
  if (function.isDefined() && angle.isDefined()) {
   surface.setDefined(true);
  } else {
   surface.setUndefined();
   return;
  }
  boolean isXAxis = line == kernel.getXAxis();
  ExpressionValue[][] coeffs = new ExpressionValue[4][4];
  FunctionNVar[] fun = surface.getFunctions();
  if (isXAxis) {
   rotation4x4(Coords.VX, funVar[1], coeffs, kernel);
   transform(function, coeffs, fun, Coords.O);
  } else {
   rotation4x4(line.getDirectionInD3().normalized(), funVar[1], coeffs, kernel);
   transform(function, coeffs, fun, line.getStartInhomCoords());
  }
  String var = function.getFunctionVariables()[0].getSetVarString();
  for (int i = 0; i < 3; i++) {
   fun[i].getExpression().replaceVariables(var, funVar[0]);
   fun[i]
     .getExpression()
     .replaceVariables(funVar[1].toString(StringTemplate.defaultTemplate), funVar[1]);
  }
  min[0] = function.getMinParameter();
  max[0] = function.getMaxParameter();
  max[1] = angle.getDouble();
  surface.setIntervals(min, max);
 }
 private void transform(
   ParametricCurve curve, ExpressionValue[][] m, FunctionNVar[] fun1, Coords startPoint) {
  ExpressionNode[] expr = new ExpressionNode[3];
  for (int i = 0; i < 3; i++) {
   expr[i] = curve.getFun(i).deepCopy(kernel).getExpression().subtract(startPoint.get(i + 1));
  }
  for (int row = 0; row < 3; row++) {
   ExpressionValue[] coeff = m[row];
   ExpressionNode trans = new ExpressionNode(kernel, coeff[3]);
   for (int i = 0; i < 3; i++) {
    trans = trans.plus(expr[i].multiplyR(coeff[i]));
   }
   fun1[row].setExpression(trans.plus(startPoint.get(row + 1)));
  }
 }
 private static void rotation4x4(
   Coords u, ExpressionValue angle, ExpressionValue[][] m, Kernel kernel) {
  double ux = u.getX();
  double uy = u.getY();
  double uz = u.getZ();
  ExpressionNode c = angle.wrap().cos();
  ExpressionNode s = angle.wrap().sin();
  ExpressionNode oneMinusC = new ExpressionNode(kernel, 1).subtract(c);
  m[0][0] = diagonalCoeff(ux, c, kernel);
  m[0][1] = oneMinusC.multiply(ux * uy).subtract(s.multiply(uz));
  m[0][2] = oneMinusC.multiply(ux * uz).plus(s.multiply(uy));
  m[1][0] = oneMinusC.multiply(ux * uy).plus(s.multiply(uz));
  m[1][1] = diagonalCoeff(uy, c, kernel);
  m[1][2] = oneMinusC.multiply(uy * uz).subtract(s.multiply(ux));
  m[2][0] = oneMinusC.multiply(ux * uz).subtract(s.multiply(uy));
  m[2][1] = oneMinusC.multiply(uy * uz).plus(s.multiply(ux));
  m[2][2] = diagonalCoeff(uz, c, kernel);
  for (int i = 0; i < 3; i++) {
   m[3][i] = new ExpressionNode(kernel, 0);
   m[i][3] = new ExpressionNode(kernel, 0);
  }
  m[3][3] = new ExpressionNode(kernel, 1);
 }
 private static ExpressionValue diagonalCoeff(double ux, ExpressionNode c, Kernel kernel) {
  return c.multiply(1 - ux * ux).plus(new MyDouble(kernel, ux * ux));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoTangentCurve3D.java
```java
public class AlgoTangentCurve3D extends AlgoLinePoint {
 private GeoPointND P; 
 private GeoCurveCartesian3D f; 
 private GeoCurveCartesian3D df;
 private GeoLine3D tangent; 
 private GeoPointND T;
 private boolean pointOnCurve;
 private boolean pointOnCurveSpecial;
 private ExpressionValue pointOnCurveSpecialParam;
 private AlgoDerivative algo;
 private double[] feval = new double[3];
 private double[] dfeval = new double[3];
 private Coords direction = new Coords(0, 0, 0, 0);
 public AlgoTangentCurve3D(Construction cons, String label, GeoPointND P, GeoCurveCartesian3D f) {
  super(cons);
  tangent = new GeoLine3D(cons);
  this.P = P;
  initialize(f);
  setInputOutput(); 
  compute();
  tangent.setLabel(label);
  update();
 }
 public void initialize(GeoCurveCartesian3D f1) {
  this.f = f1;
  pointOnCurve = false;
  if (P.getParentAlgorithm() instanceof AlgoPointOnPath) {
   AlgoPointOnPath algoPOP = (AlgoPointOnPath) P.getParentAlgorithm();
   pointOnCurve = algoPOP.getPath() == f;
  } else if (P.getParentAlgorithm() instanceof AlgoDependentPoint3D) {
   AlgoDependentPoint3D algoDP = (AlgoDependentPoint3D) P.getParentAlgorithm();
   ExpressionNode en = algoDP.getExpression();
   if (en.getOperation() == Operation.VEC_FUNCTION && en.getLeft().unwrap() == f) {
    pointOnCurveSpecial = true;
    pointOnCurveSpecialParam = en.getRight().unwrap();
   }
  }
  if (pointOnCurve || pointOnCurveSpecial) {
   T = P;
  } else {
   T = new GeoPoint3D(cons);
  }
  tangent.setStartPoint(T);
  EvalInfo info = new EvalInfo(false);
  algo = new AlgoDerivative(cons, f, true, info);
  this.df = (GeoCurveCartesian3D) algo.getResult();
  cons.removeFromConstructionList(algo);
 }
 public Commands getClassName() {
  return Commands.Tangent;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_TANGENTS;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) P;
  input[1] = f;
  setOnlyOutput(tangent);
  setDependencies(); 
 }
 public GeoLine3D getTangent() {
  return tangent;
 }
 GeoCurveCartesian3D getCurve() {
  return f;
 }
 public GeoLine3D getLine() {
  return tangent;
 }
 protected GeoPointND getPoint() {
  return T;
 }
 protected Coords getDirection() {
  if (!(f.isDefined() && P.isDefined())) {
   direction.setX(Double.NaN);
   direction.setY(Double.NaN);
   direction.setZ(Double.NaN);
   return direction;
  }
  if (df == null || !df.isDefined()) {
   direction.setX(Double.NaN);
   direction.setY(Double.NaN);
   direction.setZ(Double.NaN);
   return direction;
  }
  double tvalue;
  if (pointOnCurve) {
   tvalue = P.getPathParameter().t;
  } else if (pointOnCurveSpecialParam != null) {
   tvalue = pointOnCurveSpecialParam.evaluateDouble();
  } else {
   tvalue = f.getClosestParameter(P, f.getMinParameter());
  }
  df.evaluateCurve(tvalue, dfeval);
  direction.setX(dfeval[0]);
  direction.setY(dfeval[1]);
  direction.setZ(dfeval[2]);
  if (!pointOnCurve && !pointOnCurveSpecial) {
   f.evaluateCurve(tvalue, feval);
   T.setCoords(feval[0], feval[1], feval[2], 1.0);
  }
  return direction;
 }
 public String toString(StringTemplate tpl) {
  return getLoc().getPlain("TangentToAatB", f.getLabel(tpl), P.getLabel(tpl));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoTangentLine3D.java
```java
public class AlgoTangentLine3D extends AlgoTangentLineND {
 private Coords direction;
 private Coords direction3D;
 public AlgoTangentLine3D(Construction cons, String[] labels, GeoLineND g, GeoConicND c) {
  super(cons, labels, g, c);
 }
 protected void initDiameterAndDirection() {
  diameter = new GeoLine(cons);
  algoIntersect = new AlgoIntersectLineIncludedConic3D(cons, diameter, c);
  cons.removeFromConstructionList(algoIntersect);
  tangentPoints = algoIntersect.getIntersectionPoints();
 }
 protected void setTangents() {
  tangents = new GeoLine3D[2];
  tangents[0] = new GeoLine3D(cons);
  tangents[1] = new GeoLine3D(cons);
  tangents[0].setStartPoint(tangentPoints[0]);
  tangents[1].setStartPoint(tangentPoints[1]);
 }
 public void initForNearToRelationship() {
  Coords firstTangentPoint = tangentPoints[0].getInhomCoordsInD3();
  if (!tangents[0].isOnFullLine(firstTangentPoint, Kernel.MIN_PRECISION)) {
   algoIntersect.initForNearToRelationship();
   algoIntersect.setIntersectionPoint(0, tangentPoints[1]);
   ((GeoPoint3D) tangentPoints[1]).setCoords(firstTangentPoint);
   algoIntersect.setIntersectionPoint(1, tangentPoints[1]);
  }
 }
 protected boolean checkUndefined() {
  if (super.checkUndefined()) {
   return true;
  }
  direction3D = g.getDirectionInD3();
  direction = c.getCoordSys().getNormalProjection(direction3D)[1];
  return !DoubleUtil.isZero(direction.getZ());
 }
 protected void updateDiameterLine() {
  c.diameterLine(direction.getX(), direction.getY(), diameter);
 }
 protected void updateTangent(int index) {
  ((GeoLine3D) tangents[index]).setCoord(tangentPoints[index].getInhomCoordsInD3(), direction3D);
 }
 protected void updateTangentParabola() {
  Coords c0 = tangentPoints[0].getInhomCoordsInD3();
  Coords c1 = tangentPoints[1].getInhomCoordsInD3();
  if (c0.isDefined()) {
   ((GeoLine3D) tangents[0]).setCoord(c0, direction3D);
  } else {
   ((GeoLine3D) tangents[0]).setCoord(c1, direction3D);
  }
  tangents[1].setUndefined();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoTangentPoint3D.java
```java
public class AlgoTangentPoint3D extends AlgoTangentPointND {
 private double[] polarCoords;
 private Coords polarOrigin;
 private Coords polarDirection;
 private Coords coords2D;
 public AlgoTangentPoint3D(Construction cons, String[] labels, GeoPointND P, GeoConicND c) {
  super(cons, labels, P, c);
 }
 protected void setPolar() {
  polarCoords = new double[3];
  polar = new GeoLine(cons);
  algoIntersect = new AlgoIntersectLineIncludedConic3D(cons, polar, c);
  cons.removeFromConstructionList(algoIntersect);
  tangentPoints = algoIntersect.getIntersectionPoints();
 }
 protected void setTangentFromPolar(int i) {
  if (i == 0) { 
   polar.getCoords(polarCoords);
   polarDirection = c.getCoordSys().getVector(-polarCoords[1], polarCoords[0]);
   if (DoubleUtil.isZero(polarCoords[0])) {
    polarOrigin = c.getCoordSys().getPoint(0, -polarCoords[2] / polarCoords[1]);
   } else {
    polarOrigin = c.getCoordSys().getPoint(-polarCoords[2] / polarCoords[0], 0);
   }
  }
  ((GeoLine3D) tangents[i]).setCoord(polarOrigin, polarDirection);
 }
 protected void setTangents() {
  tangents = new GeoLine3D[2];
  tangents[0] = new GeoLine3D(cons);
  tangents[1] = new GeoLine3D(cons);
  tangents[0].setStartPoint(P);
  tangents[1].setStartPoint(P);
 }
 protected boolean checkUndefined() {
  if (super.checkUndefined()) {
   return true;
  }
  coords2D = c.getCoordSys().getNormalProjection(P.getInhomCoordsInD3())[1];
  if (!DoubleUtil.isZero(coords2D.getZ())) {
   return true;
  }
  coords2D.setZ(1);
  return false;
 }
 protected void updatePolarLine() {
  c.polarLine(coords2D, polar);
 }
 protected boolean isIntersectionPointIncident() {
  return c.isIntersectionPointIncident(coords2D, Kernel.STANDARD_PRECISION); 
 }
 protected void updateTangents() {
  if (!tangentPoints[0].isDefined()) {
   tangents[0].setUndefined();
  } else {
   ((GeoLine3D) tangents[0]).setCoord(P, tangentPoints[0]);
  }
  if (!tangentPoints[1].isDefined()) {
   tangents[1].setUndefined();
  } else {
   ((GeoLine3D) tangents[1]).setCoord(P, tangentPoints[1]);
  }
 }
 public void initForNearToRelationship() {
  initForNearToRelationship(tangentPoints, tangents[0], algoIntersect);
 }
 public static void initForNearToRelationship(
   GeoPointND[] tangentPoints, GeoLineND tangent, AlgoIntersectND algoIntersect) {
  Coords firstTangentPoint = tangentPoints[0].getInhomCoordsInD3();
  if (!tangent.isOnFullLine(firstTangentPoint, Kernel.MIN_PRECISION)) {
   algoIntersect.initForNearToRelationship();
   algoIntersect.setIntersectionPoint(0, tangentPoints[1]);
   ((GeoPoint3D) tangentPoints[1]).setCoords(firstTangentPoint);
   algoIntersect.setIntersectionPoint(1, tangentPoints[1]);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoTransformation3D.java
```java
public class AlgoTransformation3D {
 public static void toGeoCurveCartesian(
   Kernel kernel, GeoFunction geoFun, GeoCurveCartesian3D curve) {
  FunctionVariable t = curve.getFun(1) == null ? null : curve.getFun(1).getFunctionVariables()[0];
  if (t == null) {
   t = new FunctionVariable(kernel, "t");
  }
  Function function = geoFun.getFunction();
  if (function == null) {
   curve.setUndefined();
   return;
  }
  FunctionVariable x = function.getFunctionVariable();
  ExpressionNode yExp =
    (ExpressionNode) function.getExpression().deepCopy(kernel).replace(x, t);
  Function[] fun = new Function[3];
  fun[0] = new Function(new ExpressionNode(kernel, t), t);
  fun[1] = new Function(yExp, t);
  fun[2] = new Function(new ExpressionNode(kernel, 0), t);
  curve.setFun(fun);
  if (geoFun.hasInterval()) {
   curve.setInterval(geoFun.getIntervalMin(), geoFun.getIntervalMax());
  } else {
   double min = kernel.getXminForFunctions();
   double max = kernel.getXmaxForFunctions();
   curve.setInterval(min, max);
  }
 }
 public static void toGeoSurfaceCartesian(
   Kernel kernel, GeoFunctionNVar geoFun, GeoSurfaceCartesian3D surface) {
  FunctionVariable u = new FunctionVariable(kernel, "u");
  FunctionVariable v = new FunctionVariable(kernel, "v");
  FunctionNVar function = geoFun.getFunction();
  if (function == null) {
   surface.setUndefined();
   return;
  }
  FunctionVariable x = function.getFunctionVariables()[0];
  FunctionVariable y = function.getFunctionVariables()[1];
  ExpressionNode yExp = (ExpressionNode)
    function.getExpression().deepCopy(kernel).replace(x, u).wrap().replace(y, v);
  FunctionNVar[] fun = new FunctionNVar[3];
  fun[0] = new FunctionNVar(new ExpressionNode(kernel, u), new FunctionVariable[] {u, v});
  fun[1] = new FunctionNVar(new ExpressionNode(kernel, v), new FunctionVariable[] {u, v});
  fun[2] = new FunctionNVar(yExp, new FunctionVariable[] {u, v});
  surface.setFun(fun);
  double[] min = new double[2];
  double[] max = new double[2];
  for (int dim = 0; dim < 2; dim++) {
   min[dim] = Double.isFinite(geoFun.getMinParameter(dim)) ? geoFun.getMinParameter(dim) : -10;
   max[dim] = Double.isFinite(geoFun.getMaxParameter(dim)) ? geoFun.getMaxParameter(dim) : 10;
  }
  surface.setStartParameter(min);
  surface.setEndParameter(max);
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoTranslate3D.java
```java
public class AlgoTranslate3D extends AlgoTranslate {
 public AlgoTranslate3D(Construction cons, GeoElement in, GeoElement v) {
  super(cons, in, v);
 }
 protected Coords getVectorCoords() {
  GeoVectorND vec = (GeoVectorND) v;
  return vec.getCoordsInD3();
 }
 protected GeoElement copy(GeoElement geo) {
  if (v.isGeoElement3D()) {
   return kernel.copy3D(geo);
  }
  return super.copy(geo);
 }
 protected GeoElement getResultTemplate(GeoElement geo) {
  if ((geo instanceof GeoFunction || geo instanceof GeoCurveCartesian) && v.isGeoElement3D()) {
   return new GeoCurveCartesian3D(cons);
  }
  return super.getResultTemplate(geo);
 }
 protected GeoElement copyInternal(Construction cons1, GeoElement geo) {
  if (v.isGeoElement3D()) {
   return kernel.copyInternal3D(cons1, geo);
  }
  return super.copyInternal(cons1, geo);
 }
 protected void setOutGeo() {
  if (inGeo instanceof GeoFunction && v.isGeoElement3D()) {
   AlgoTransformation3D.toGeoCurveCartesian(
     kernel, (GeoFunction) inGeo, (GeoCurveCartesian3D) outGeo);
  } else {
   super.setOutGeo();
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoTranslateVector3D.java
```java
public class AlgoTranslateVector3D extends AlgoTranslateVector {
 public AlgoTranslateVector3D(Construction cons, String label, GeoVectorND v, GeoPointND A) {
  super(cons, label, v, A);
 }
 protected GeoVectorND newGeoVector(Construction cons1) {
  return new GeoVector3D(cons1);
 }
 public void compute() {
  ((GeoVector3D) w).setCoords(v.getCoordsInD3());
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoUnionPolygons3D.java
```java
public class AlgoUnionPolygons3D extends AlgoPolygonOperations3D {
 public AlgoUnionPolygons3D(Construction cons, String[] labels, GeoPoly inPoly0, GeoPoly inPoly1) {
  super(cons, labels, inPoly0, inPoly1, PolyOperation.UNION);
  initialize(null);
 }
 public GetCommand getClassName() {
  return Commands.Union;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoUnitOrthoVectorPlane.java
```java
public class AlgoUnitOrthoVectorPlane extends AlgoOrthoVectorPlane {
 AlgoUnitOrthoVectorPlane(Construction cons, String label, GeoCoordSys2D plane) {
  super(cons, label, plane);
 }
 protected void updateCoords() {
  if (plane instanceof GeoPlane3D) {
   vCoords.setValues(plane.getCoordSys().getEquationVector(), 3); 
   vCoords.normalize();
  } else {
   plane.getCoordSys().getVz().normalized(vCoords);
  }
 }
 public Commands getClassName() {
  return Commands.UnitOrthogonalVector;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoUnitVector3D.java
```java
public class AlgoUnitVector3D extends AlgoUnitVector {
 public AlgoUnitVector3D(Construction cons, GeoDirectionND line, boolean normalize) {
  super(cons, (GeoElement) line, normalize);
 }
 protected GeoVectorND createVector(Construction cons1) {
  return new GeoVector3D(cons1);
 }
 public final void compute() {
  Coords coords = ((GeoDirectionND) inputGeo).getDirectionInD3();
  length = coords.norm();
  if (!normalize) {
   ((GeoVector3D) u).setCoords(coords);
  } else if (DoubleUtil.isZero(length)) {
   u.setUndefined();
  } else {
   ((GeoVector3D) u).setCoords(coords.mul(1 / length));
  }
 }
 protected GeoPointND getInputStartPoint() {
  if (inputGeo.isGeoLine()) {
   return ((GeoLineND) inputGeo).getStartPoint();
  }
  if (inputGeo.isGeoVector()) {
   return ((GeoVectorND) inputGeo).getStartPoint();
  }
  return null; 
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoUnitVectorPoint3D.java
```java
public class AlgoUnitVectorPoint3D extends AlgoUnitVector {
 public AlgoUnitVectorPoint3D(Construction cons, GeoPoint3D point, boolean normalize) {
  super(cons, point, normalize);
 }
 protected GeoVectorND createVector(Construction cons1) {
  return new GeoVector3D(cons1);
 }
 public final void compute() {
  Coords coords = ((GeoPoint3D) inputGeo).getInhomCoordsInD3();
  length = MyMath.length(coords.getX(), coords.getY(), coords.getZ());
  if (!normalize) {
   ((GeoVector3D) u).setCoords(coords);
  } else if (DoubleUtil.isZero(length)) {
   u.setUndefined();
  } else {
   Coords divided = coords.mul(1 / length);
   divided.setW(0);
   ((GeoVector3D) u).setCoords(divided);
  }
 }
 protected GeoPointND getInputStartPoint() {
  return null;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoVector3D.java
```java
public class AlgoVector3D extends AlgoVector {
 public AlgoVector3D(Construction cons, GeoPointND P, GeoPointND Q) {
  super(cons, P, Q);
 }
 protected GeoVectorND createNewVector() {
  return new GeoVector3D(cons);
 }
 protected GeoPointND newStartPoint() {
  return new GeoPoint3D(getP());
 }
 protected void setCoords() {
  getVector()
    .setCoords(getQ().getInhomCoordsInD3().sub(getP().getInhomCoordsInD3()).get());
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoVectorPoint3D.java
```java
public class AlgoVectorPoint3D extends AlgoVectorPoint {
 public AlgoVectorPoint3D(Construction cons, String label, GeoPointND P) {
  super(cons, label, P);
 }
 public AlgoVectorPoint3D(Construction cons, GeoPointND P) {
  super(cons, P);
 }
 protected GeoVectorND createNewVector() {
  return new GeoVector3D(cons);
 }
 protected void setCoords() {
  Coords coords = getP().getInhomCoordsInD3();
  getVector().setCoords(new double[] {coords.getX(), coords.getY(), coords.getZ(), 0});
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoVertexConic3D.java
```java
public class AlgoVertexConic3D extends AlgoVertexConic {
 public AlgoVertexConic3D(Construction cons, String[] labels, GeoConicND c) {
  super(cons, labels, c);
 }
 protected void createVertex(Construction cons1) {
  vertex = new GeoPoint3D[4];
  for (int i = 0; i < vertex.length; i++) {
   vertex[i] = new GeoPoint3D(cons1);
  }
 }
 protected void setCoords(int i, double x, double y) {
  ((GeoPoint3D) vertex[i]).setCoords(c.getCoordSys().getPoint(x, y));
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoVertexPolygon3D.java
```java
public class AlgoVertexPolygon3D extends AlgoVertexPolygon {
 public AlgoVertexPolygon3D(Construction cons, String[] labels, GeoPoly p) {
  super(cons, labels, p);
 }
 public AlgoVertexPolygon3D(Construction cons, GeoPoly p) {
  super(cons, p);
 }
 public AlgoVertexPolygon3D(Construction cons, String label, GeoPoly p, GeoNumberValue v) {
  super(cons, label, p, v);
 }
 public GeoPointND newGeoPoint(Construction cons1) {
  return new GeoPoint3D(cons1);
 }
 protected void setPoint(GeoPointND point, int i) {
  ((GeoPoint3D) point).setCoords(((GeoPolygon3D) p).getPoint3D(i));
 }
 protected OutputHandler<GeoElement> createOutputPoints() {
  return new OutputHandler<>(() -> {
   GeoPoint3D pt = new GeoPoint3D(cons);
   pt.setCoords(0, 0, 0, 1);
   pt.setParentAlgorithm(this);
   return pt;
  });
 }
}
```

### FILE: geogebra3D/kernel3D/algos/AlgoVolume.java
```java
public class AlgoVolume extends AlgoElement {
 private HasVolume hasVolume; 
 private GeoNumeric volume; 
 public AlgoVolume(Construction cons, String label, HasVolume hasVolume) {
  super(cons);
  this.hasVolume = hasVolume;
  volume = new GeoNumeric(cons);
  setInputOutput(); 
  compute();
  volume.setLabel(label);
 }
 public Commands getClassName() {
  return Commands.Volume;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_VOLUME;
 }
 protected void setInputOutput() {
  input = new GeoElement[1];
  input[0] = (GeoElement) hasVolume;
  setOnlyOutput(volume);
  setDependencies(); 
 }
 public GeoNumeric getVolume() {
  return volume;
 }
 public final void compute() {
  volume.setValue(hasVolume.getVolume());
 }
}
```

### FILE: geogebra3D/kernel3D/algos/ExtrudeConverter.java
```java
public class ExtrudeConverter implements CoordConverter {
 private Coords project1;
 private Coords project2;
 private double[] lineCoords;
 private double[] tmp;
 public double translationToValue(
   Coords direction, Coords rwTransVec, double startValue, EuclidianView view) {
  return snap(direction.dotproduct3(rwTransVec) + startValue, view);
 }
 public double snap(double val, EuclidianView view) {
  double g = view.getGridDistances(0);
  double valRound = Kernel.roundToScale(val, g);
  if (view.getPointCapturingMode() == EuclidianStyleConstants.POINT_CAPTURING_ON_GRID
    || (Math.abs(valRound - val)
      < g * view.getEuclidianController().getPointCapturingPercentage())) {
   return valRound;
  }
  return val;
 }
 public void record(ChangeableParent parent, Coords startPoint) {
 }
 public void updateTranslation(
   Coords startPoint3D,
   Coords direction,
   Coords rayOrigin,
   Coords rayDirection,
   Coords translationVec3D) {
  if (project1 == null) {
   project1 = new Coords(4);
   project2 = new Coords(4);
   lineCoords = new double[2];
   tmp = new double[4];
  }
  CoordMatrixUtil.nearestPointsFromTwoLines(
    startPoint3D,
    direction,
    rayOrigin,
    rayDirection,
    project1.val,
    project2.val,
    lineCoords,
    tmp);
  if (Double.isNaN(lineCoords[0])) {
   translationVec3D.setUndefined();
  } else {
   translationVec3D.setSub3(project1, startPoint3D);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/algos/ExtrusionComputer.java
```java
public class ExtrusionComputer {
 private static final int MIN_COMPUTATIONS_VALIDATING_DRAGGING = 1;
 private static final int MIN_COMPUTATIONS_VALIDATING_DRAGGING_AR = 15;
 private AlgoForExtrusion algo;
 private int computed;
 public ExtrusionComputer(AlgoForExtrusion algo) {
  this.algo = algo;
  algo.setExtrusionComputer(this);
  computed = 0;
 }
 public void compute() {
  computed++;
 }
 public boolean getWasComputedByDragging(boolean isAREnabled) {
  return computed > getComputationsThreshold(isAREnabled);
 }
 public AlgoForExtrusion getAlgo() {
  return algo;
 }
 private int getComputationsThreshold(boolean isAREnabled) {
  return isAREnabled
    ? MIN_COMPUTATIONS_VALIDATING_DRAGGING_AR
    : MIN_COMPUTATIONS_VALIDATING_DRAGGING;
 }
}
```

### FILE: geogebra3D/kernel3D/algos/Manager3D.java
```java
public class Manager3D implements Manager3DInterface {
 @Weak
 private Kernel kernel;
 @Weak
 private Construction cons;
 private Coords tmpCoords;
 private Coords tmpCoords2;
 private Coords tmpCoords3;
 public Manager3D(Kernel kernel) {
  this.kernel = kernel;
  this.cons = kernel.getConstruction();
 }
 public final GeoPoint3D point3D(double x, double y, double z, boolean coords2D) {
  GeoPoint3D p = new GeoPoint3D(cons);
  if (coords2D) {
   p.setCartesian();
  } else {
   p.setCartesian3D();
  }
  p.setCoords(x, y, z, 1.0);
  return p;
 }
 public final GeoPoint3D dependentPoint3D(ExpressionNode root, boolean addToCons) {
  AlgoDependentPoint3D algo = new AlgoDependentPoint3D(cons, root, addToCons);
  GeoPoint3D P = algo.getPoint3D();
  P.setCartesian3D();
  return P;
 }
 public final GeoVector3D dependentVector3D(ExpressionNode root) {
  AlgoDependentVector3D algo = new AlgoDependentVector3D(cons, root);
  return algo.getVector3D();
 }
 public final GeoVector3D vector3D(double x, double y, double z) {
  return new GeoVector3D(cons, x, y, z);
 }
 public final GeoVector3D vector3D(String label, GeoPointND P, GeoPointND Q) {
  AlgoVector3D algo = new AlgoVector3D(cons, P, Q);
  GeoVector3D v = (GeoVector3D) algo.getVector();
  v.setEuclidianVisible(true);
  v.setLabel(label);
  kernel.notifyUpdate(v);
  return v;
 }
 public final GeoPoint3D point3DIn(
   String label, Region region, Coords coords, boolean addToConstruction, boolean coords2D) {
  boolean oldMacroMode = false;
  if (!addToConstruction) {
   oldMacroMode = cons.isSuppressLabelsActive();
   cons.setSuppressLabelCreation(true);
  }
  AlgoPoint3DInRegion algo = new AlgoPoint3DInRegion(cons, label, region, coords);
  GeoPoint3D p = algo.getP();
  if (coords2D) {
   p.setCartesian();
  } else {
   p.setCartesian3D();
  }
  p.update();
  if (!addToConstruction) {
   cons.setSuppressLabelCreation(oldMacroMode);
  }
  return p;
 }
 public final GeoPoint3D point3DIn(String label, Region region, boolean coords2D) {
  return point3DIn(label, region, null, true, coords2D);
 }
 public final GeoPoint3D point3D(
   String label,
   Path path,
   double x,
   double y,
   double z,
   boolean addToConstruction,
   boolean coords2D) {
  boolean oldMacroMode = false;
  if (!addToConstruction) {
   oldMacroMode = cons.isSuppressLabelsActive();
   cons.setSuppressLabelCreation(true);
  }
  AlgoPoint3DOnPath algo = new AlgoPoint3DOnPath(cons, path, x, y, z);
  GeoPoint3D p = (GeoPoint3D) algo.getP();
  if (coords2D) {
   p.setCartesian();
  } else {
   p.setCartesian3D();
  }
  p.setLabel(label);
  if (!addToConstruction) {
   cons.setSuppressLabelCreation(oldMacroMode);
  }
  return p;
 }
 public final GeoPoint3D point3D(String label, Path path, boolean coords2D) {
  GeoPoint3D p = point3D(label, path, 0, 0, 0, true, coords2D);
  return p;
 }
 public GeoPointND point3D(String label, Path path, GeoNumberValue param) {
  AlgoPoint3DOnPath algo;
  if (param == null) {
   algo = new AlgoPoint3DOnPath(cons, path, 0, 0, 0);
  } else {
   algo = new AlgoPoint3DOnPath(cons, path, param);
  }
  GeoPointND p = algo.getP();
  if (!p.isDefined()) {
   p.setCoords(1, 0, 0, 1);
  }
  if (!p.isDefined()) {
   p.setCoords(Math.random(), 0, 0, 1);
  }
  p.setLabel(label);
  return p;
 }
 public final GeoPoint3D midpoint(String label, GeoPointND P, GeoPointND Q) {
  AlgoMidpoint3D algo = new AlgoMidpoint3D(cons, P, Q);
  GeoPoint3D M = algo.getPoint();
  M.setLabel(label);
  return M;
 }
 public GeoPointND midpoint(String label, GeoSegmentND segment) {
  AlgoMidpoint3D algo = new AlgoMidpointSegment3D(cons, segment);
  GeoPoint3D M = algo.getPoint();
  M.setLabel(label);
  return M;
 }
 public GeoPointND center(String label, GeoConicND conic) {
  AlgoCenterConic3D algo = new AlgoCenterConic3D(cons, label, conic);
  return algo.getPoint();
 }
 public GeoPointND centerQuadric(String label, GeoQuadricND quadric) {
  AlgoCenterQuadric algo = new AlgoCenterQuadric(cons, label, (GeoQuadric3D) quadric);
  return algo.getPoint();
 }
 public final GeoSegment3D segment3D(String label, GeoPointND P1, GeoPointND P2) {
  AlgoJoinPoints3D algo = new AlgoJoinPoints3D(cons, label, P1, P2, GeoClass.SEGMENT3D);
  GeoSegment3D s = (GeoSegment3D) algo.getCS();
  return s;
 }
 public final GeoLine3D line3D(String label, GeoPointND P1, GeoPointND P2) {
  AlgoJoinPoints3D algo = new AlgoJoinPoints3D(cons, label, P1, P2, GeoClass.LINE3D);
  GeoLine3D l = (GeoLine3D) algo.getCS();
  return l;
 }
 public final GeoLineND line3D(String label, GeoPointND P, GeoLineND l) {
  AlgoLinePointLine3D algo = new AlgoLinePointLine3D(cons, P, l);
  GeoLineND g = algo.getLine();
  g.setLabel(label);
  return g;
 }
 public final GeoLineND line3D(String label, GeoPointND P, GeoVectorND v) {
  AlgoLinePointVector3D algo = new AlgoLinePointVector3D(cons, P, v);
  GeoLineND g = algo.getLine();
  g.setLabel(label);
  return g;
 }
 public final GeoRay3D ray3D(String label, GeoPointND P1, GeoPointND P2) {
  AlgoJoinPoints3D algo = new AlgoJoinPoints3D(cons, label, P1, P2, GeoClass.RAY3D);
  return (GeoRay3D) algo.getCS();
 }
 public GeoLineND orthogonalLine3D(String label, GeoPointND point, GeoCoordSys2D cs) {
  AlgoOrthoLinePointPlane algo = new AlgoOrthoLinePointPlane(cons, label, point, cs);
  return algo.getLine();
 }
 public GeoLineND orthogonalLine3D(String label, GeoPointND point, GeoLineND line) {
  AlgoOrthoLinePointLine3D algo = new AlgoOrthoLinePointLine3D(cons, label, point, line);
  return algo.getLine();
 }
 public GeoLineND orthogonalLine3D(
   String label, GeoPointND point, GeoDirectionND line, GeoDirectionND direction) {
  if (line instanceof GeoLineND && direction instanceof GeoSpace) {
   return orthogonalLine3D(label, point, (GeoLineND) line);
  }
  if ((!cons.is3D() || direction == cons.getXOYPlane())
    && (point instanceof GeoPoint)
    && (line instanceof GeoLine)) {
   AlgoOrthoLinePointLine algo =
     new AlgoOrthoLinePointLine(cons, label, (GeoPoint) point, (GeoLine) line);
   return algo.getLine();
  }
  AlgoOrthoLinePointDirectionDirection algo =
    new AlgoOrthoLinePointDirectionDirection(cons, label, point, line, direction);
  return algo.getLine();
 }
 public GeoLineND orthogonalLine3D(String label, GeoLineND line1, GeoLineND line2) {
  AlgoOrthoLineLineLine algo = new AlgoOrthoLineLineLine(cons, label, line1, line2);
  return algo.getLine();
 }
 public GeoVectorND orthogonalVector3D(String label, GeoCoordSys2D plane) {
  AlgoOrthoVectorPlane algo = new AlgoOrthoVectorPlane(cons, label, plane);
  return algo.getVector();
 }
 public GeoVectorND orthogonalVector3D(String label, GeoLineND line, GeoDirectionND direction) {
  AlgoOrthoVectorLineDirection algo =
    new AlgoOrthoVectorLineDirection(cons, label, line, direction);
  return algo.getVector();
 }
 public GeoVectorND unitOrthogonalVector3D(String label, GeoCoordSys2D plane) {
  AlgoUnitOrthoVectorPlane algo = new AlgoUnitOrthoVectorPlane(cons, label, plane);
  return algo.getVector();
 }
 public final GeoElement[] polygon3D(String[] label, GeoPointND[] points) {
  this.kernel.batchAddStarted();
  AlgoPolygon3D algo = new AlgoPolygon3D(cons, label, points, null);
  this.kernel.batchAddComplete();
  return algo.getOutput();
 }
 public final GeoElement[] polygon3D(
   String[] label, GeoPointND[] points, GeoDirectionND direction) {
  AlgoPolygon algo = new AlgoPolygon3DDirection(cons, label, points, direction);
  return algo.getOutput();
 }
 public final GeoElement[] polyLine3D(String label, GeoPointND[] P) {
  AlgoPolyLine3D algo = new AlgoPolyLine3D(cons, label, P);
  return algo.getOutput();
 }
 public final GeoElement[] polyLine3D(String label, GeoList pointList) {
  AlgoPolyLine3D algo = new AlgoPolyLine3D(cons, label, pointList);
  return algo.getOutput();
 }
 public final GeoElement[] prism(String[] labels, GeoPointND[] points) {
  AlgoPolyhedronPointsPrism algo = new AlgoPolyhedronPointsPrism(cons, labels, points);
  return algo.getOutput();
 }
 public final GeoElement[] prism(String[] labels, GeoPolygon polygon, GeoPointND point) {
  AlgoPolyhedronPointsPrism algo = new AlgoPolyhedronPointsPrism(cons, labels, polygon, point);
  return algo.getOutput();
 }
 public final GeoElement[] prism(String[] labels, GeoPolygon polygon, GeoNumberValue height) {
  AlgoPolyhedronPointsPrism algo = new AlgoPolyhedronPointsPrism(cons, labels, polygon, height);
  return algo.getOutput();
 }
 public final GeoElement[] pyramid(String[] labels, GeoPointND[] points) {
  AlgoPolyhedronPointsPyramid algo = new AlgoPolyhedronPointsPyramid(cons, labels, points);
  return algo.getOutput();
 }
 public final GeoElement[] pyramid(String[] labels, GeoPolygon polygon, GeoPointND point) {
  AlgoPolyhedronPointsPyramid algo =
    new AlgoPolyhedronPointsPyramid(cons, labels, polygon, point);
  return algo.getOutput();
 }
 public final GeoElement[] pyramid(String[] labels, GeoPolygon polygon, GeoNumberValue height) {
  AlgoPolyhedronPointsPyramid algo =
    new AlgoPolyhedronPointsPyramid(cons, labels, polygon, height);
  return algo.getOutput();
 }
 public final GeoPlane3D plane3D(double a, double b, double c, double d) {
  GeoPlane3D plane = new GeoPlane3D(cons, a, b, c, d);
  if (Double.isNaN(d) || Double.isNaN(c) || Double.isNaN(b) || Double.isNaN(a)) {
   plane.setUndefined();
  }
  return plane;
 }
 public final GeoPlane3D dependentPlane3D(Equation equ) {
  AlgoDependentPlane3D algo = new AlgoDependentPlane3D(cons, equ);
  return algo.getPlane();
 }
 public final GeoQuadric3D dependentQuadric3D(Equation equ) {
  AlgoDependentQuadric3D algo = new AlgoDependentQuadric3D(cons, equ);
  return algo.getQuadric();
 }
 public final GeoPlane3D plane3D(String label, GeoPointND point, GeoLineND line) {
  AlgoPlaneThroughPointAndLine algo = new AlgoPlaneThroughPointAndLine(cons, label, point, line);
  return algo.getPlane();
 }
 public final GeoPlane3D plane3D(String label, GeoPointND point, GeoCoordSys2D cs) {
  AlgoPlaneThroughPointAndPlane algo = new AlgoPlaneThroughPointAndPlane(cons, label, point, cs);
  return algo.getPlane();
 }
 public final GeoPlane3D orthogonalPlane3D(String label, GeoPointND point, GeoLineND line) {
  return new AlgoOrthoPlanePointLine(cons, label, point, line).getPlane();
 }
 public final GeoPlane3D orthogonalPlane3D(String label, GeoPointND point, GeoVectorND vector) {
  return new AlgoOrthoPlanePointVector(cons, label, point, vector).getPlane();
 }
 public final GeoPlane3D planeBisector(String label, GeoPointND point1, GeoPointND point2) {
  return new AlgoOrthoPlaneBisectorPointPoint(cons, label, point1, point2).getPlane();
 }
 public final GeoPlane3D planeBisector(String label, GeoSegmentND segment) {
  return new AlgoOrthoPlaneBisectorSegment(cons, label, segment).getPlane();
 }
 public final GeoQuadric3D sphere(String label, GeoPointND M, GeoNumberValue r) {
  AlgoSpherePointRadius algo = new AlgoSpherePointRadius(cons, M, r);
  algo.getSphere().setToSpecificForm();
  algo.getSphere().setLabel(label);
  return algo.getSphere();
 }
 public final GeoQuadric3D sphere(String label, GeoPointND M, GeoPointND P) {
  AlgoSphereTwoPoints algo = new AlgoSphereTwoPoints(cons, M, P);
  algo.getSphere().setToSpecificForm();
  algo.getSphere().setLabel(label);
  return algo.getSphere();
 }
 public final GeoQuadric3D cone(
   String label, GeoPointND origin, GeoVectorND direction, GeoNumberValue angle) {
  AlgoQuadric algo = new AlgoConeInfinitePointVectorNumber(cons, label, origin, direction, angle);
  return algo.getQuadric();
 }
 public final GeoQuadric3D cone(
   String label, GeoPointND origin, GeoPointND secondPoint, GeoNumberValue angle) {
  AlgoQuadric algo =
    new AlgoConeInfinitePointPointNumber(cons, label, origin, secondPoint, angle);
  return algo.getQuadric();
 }
 public final GeoQuadric3D cone(
   String label, GeoPointND origin, GeoLineND axis, GeoNumberValue angle) {
  AlgoConePointLineAngle algo = new AlgoConePointLineAngle(cons, label, origin, axis, angle);
  return algo.getQuadric();
 }
 public final GeoElement[] coneLimited(
   String[] labels, GeoPointND origin, GeoPointND secondPoint, GeoNumberValue r) {
  AlgoQuadricLimitedPointPointRadius algo =
    new AlgoQuadricLimitedPointPointRadiusCone(cons, labels, origin, secondPoint, r);
  return algo.getOutput();
 }
 public final GeoElement[] coneLimited(String[] labels, GeoConicND bottom, GeoNumberValue height) {
  AlgoQuadricLimitedConicHeightCone algo =
    new AlgoQuadricLimitedConicHeightCone(cons, labels, bottom, height);
  algo.update(); 
  return algo.getOutput();
 }
 public final GeoQuadric3D cylinder(
   String label, GeoPointND origin, GeoVectorND direction, GeoNumberValue r) {
  AlgoQuadric algo = new AlgoCylinderInfinitePointVectorNumber(cons, label, origin, direction, r);
  return algo.getQuadric();
 }
 public final GeoQuadric3D cylinder(
   String label, GeoPointND origin, GeoPointND secondPoint, GeoNumberValue r) {
  AlgoQuadric algo =
    new AlgoCylinderInfinitePointPointNumber(cons, label, origin, secondPoint, r);
  return algo.getQuadric();
 }
 public final GeoQuadric3D cylinder(String label, GeoLineND axis, GeoNumberValue r) {
  AlgoQuadric algo = new AlgoCylinderAxisRadius(cons, label, axis, r);
  return algo.getQuadric();
 }
 public final GeoElement[] cylinderLimited(
   String[] labels, GeoPointND origin, GeoPointND secondPoint, GeoNumberValue r) {
  AlgoQuadricLimitedPointPointRadius algo =
    new AlgoQuadricLimitedPointPointRadiusCylinder(cons, labels, origin, secondPoint, r);
  algo.update(); 
  return algo.getOutput();
 }
 public final GeoElement[] cylinderLimited(
   String[] labels, GeoConicND bottom, GeoNumberValue height) {
  AlgoQuadricLimitedConicHeightCylinder algo =
    new AlgoQuadricLimitedConicHeightCylinder(cons, labels, bottom, height);
  algo.update(); 
  return algo.getOutput();
 }
 public final GeoQuadric3DPart quadricSide(String label, GeoQuadricND quadric) {
  AlgoQuadric algo = new AlgoQuadricSide(cons, (GeoQuadric3DLimited) quadric, false, null);
  algo.getQuadric().setLabel(label);
  return (GeoQuadric3DPart) algo.getQuadric();
 }
 public final GeoConic3D quadricBottom(String label, GeoQuadricND quadric) {
  AlgoQuadricEnd algo = new AlgoQuadricEndBottom(cons, label, (GeoQuadric3DLimited) quadric);
  return algo.getSection();
 }
 public final GeoConic3D quadricTop(String label, GeoQuadricND quadric) {
  AlgoQuadricEnd algo = new AlgoQuadricEndTop(cons, label, (GeoQuadric3DLimited) quadric);
  return algo.getSection();
 }
 public final GeoConic3D circle3D(String label, GeoPointND A, GeoPointND B, GeoPointND C) {
  AlgoCircleThreePoints algo = new AlgoCircle3DThreePoints(cons, A, B, C);
  GeoConic3D circle = (GeoConic3D) algo.getCircle();
  circle.setLabel(label);
  return circle;
 }
 public GeoConic3D circle3D(String label, GeoLineND axis, GeoPointND A) {
  AlgoCircle3DAxisPoint algo = new AlgoCircle3DAxisPoint(cons, label, axis, A);
  GeoConic3D circle = algo.getCircle();
  circle.update();
  kernel.notifyUpdate(circle);
  return circle;
 }
 public GeoConicND circle3D(
   String label, GeoPointND A, GeoNumberValue radius, GeoDirectionND axis) {
  if (!A.isGeoElement3D() && axis == kernel.getXOYPlane()) {
   return kernel.getAlgoDispatcher().circle(label, A, radius);
  }
  AlgoCircle3DPointDirection algo = new AlgoCircle3DPointRadiusDirection(cons, A, radius, axis);
  GeoConic3D circle = algo.getCircle();
  circle.setLabel(label);
  kernel.notifyUpdate(circle);
  return circle;
 }
 public GeoConicND circle3D(String label, GeoPointND A, GeoNumberValue radius) {
  return circle3D(label, A, radius, kernel.getXOYPlane());
 }
 public GeoConicND circle3D(String label, GeoPointND A, GeoPointND B, GeoDirectionND orientation) {
  if (!A.isGeoElement3D()
    && !B.isGeoElement3D() 
    && orientation == kernel.getXOYPlane()) { 
   return kernel.getAlgoDispatcher().circle(label, (GeoPoint) A, (GeoPoint) B);
  }
  AlgoCircle3DPointDirection algo = new AlgoCircle3DPointPointDirection(cons, A, B, orientation);
  GeoConic3D circle = algo.getCircle();
  circle.setLabel(label);
  kernel.notifyUpdate(circle);
  return circle;
 }
 public final GeoPlane3D plane3D(String label, GeoPointND A, GeoPointND B, GeoPointND C) {
  AlgoPlaneThreePoints algo = new AlgoPlaneThreePoints(cons, label, A, B, C);
  GeoPlane3D plane = (GeoPlane3D) algo.getCoordSys();
  return plane;
 }
 public GeoElement plane3D(String label, GeoLineND a, GeoLineND b) {
  AlgoPlaneTwoLines algo = new AlgoPlaneTwoLines(cons, label, a, b);
  return (GeoPlane3D) algo.getCoordSys();
 }
 public final GeoPlane3D plane3D(String label, GeoCoordSys2D cs2D) {
  AlgoPlaneCS2D algo = new AlgoPlaneCS2D(cons, cs2D);
  GeoPlane3D plane = (GeoPlane3D) algo.getCoordSys();
  plane.setLabel(label);
  return plane;
 }
 public final GeoPlane3D plane3D(GeoCoordSys2D cs2D) {
  AlgoPlaneCS2D algo = new AlgoPlaneCS2D(cons, cs2D);
  GeoPlane3D plane = (GeoPlane3D) algo.getCoordSys();
  return plane;
 }
 public final GeoElement intersect(
   String label, GeoLineND cs1, GeoCoordSys2D cs2, boolean swapInputs) {
  AlgoIntersectCoordSys algo = new AlgoIntersectCS1D2D(cons, label, cs1, cs2, swapInputs);
  return algo.getIntersection();
 }
 public final GeoElement intersect(String label, GeoLineND cs1, GeoLineND cs2) {
  AlgoIntersectCoordSys algo = new AlgoIntersectCS1D1D(cons, label, cs1, cs2);
  return algo.getIntersection();
 }
 public GeoElement[] intersectionPoint(String[] labels, GeoLineND g, GeoSurfaceFinite p) {
  if (p instanceof GeoPolygon) {
   AlgoElement algo = new AlgoIntersectLinePolygon3D(cons, labels, g, (GeoPolygon) p);
   return algo.getOutput();
  }
  return null;
 }
 public GeoElement[] intersectionPoint(String[] labels, GeoPlaneND plane, GeoElement s) {
  if (s instanceof GeoPolygon) {
   AlgoIntersectPlanePolygon algo =
     new AlgoIntersectPlanePolygon(cons, labels, (GeoPlane3D) plane, (GeoPolygon) s);
   return algo.getOutput();
  }
  if (s.isGeoPolyhedron()) {
   AlgoIntersectPlanePolyhedron algo =
     new AlgoIntersectPlanePolyhedron(cons, labels, (GeoPlane3D) plane, (GeoPolyhedron) s);
   return algo.getOutput();
  }
  return null;
 }
 public GeoElement[] intersectPath(String[] labels, GeoLineND g, GeoSurfaceFinite p) {
  AlgoIntersectPathLinePolygon3D algo;
  if (p instanceof GeoPolygon) {
   algo = new AlgoIntersectPathLinePolygon3D(cons, labels, (GeoElement) g, (GeoPolygon) p);
   return algo.getOutput();
  }
  return null;
 }
 public GeoElement[] intersectPath(String[] labels, GeoPlaneND plane, GeoElement p) {
  if (p instanceof GeoPolygon) {
   AlgoIntersectPathPlanePolygon3D algo =
     new AlgoIntersectPathPlanePolygon3D(cons, labels, (GeoPlane3D) plane, p);
   return algo.getOutput();
  }
  return null;
 }
 public GeoElement[] intersectPlaneFunctionNVar(
   String label, GeoPlaneND plane, GeoFunctionNVar fun) {
  GeoElement[] ret = intersectPlaneFunctionNVar(plane, fun);
  ret[0].setLabel(label);
  return ret;
 }
 public GeoElement[] intersectPlaneFunctionNVar(GeoPlaneND plane, GeoFunctionNVar fun) {
  AlgoIntersectFunctionNVarPlane algo = new AlgoIntersectFunctionNVarPlane(cons, fun, plane);
  return algo.getOutput();
 }
 public GeoElement[] intersectPath(GeoPlaneND plane, GeoPolygon p) {
  AlgoIntersectPathPlanePolygon3D algo =
    new AlgoIntersectPathPlanePolygon3D(cons, (GeoPlane3D) plane, p);
  algo.update();
  return algo.getOutput();
 }
 public GeoElement[] intersectRegion(
   String[] labels, GeoPlaneND plane, GeoElement p, int[] outputSizes) {
  if (p.isGeoPolyhedron()) {
   AlgoIntersectRegionPlanePolyhedron algo = new AlgoIntersectRegionPlanePolyhedron(
     cons, labels, (GeoPlane3D) plane, (GeoPolyhedron) p, outputSizes);
   return algo.getOutput();
  }
  return null;
 }
 public GeoElement[] intersectRegion(GeoPlaneND plane, GeoElement p) {
  if (p.isGeoPolyhedron()) {
   AlgoIntersectRegionPlanePolyhedron algo =
     new AlgoIntersectRegionPlanePolyhedron(cons, (GeoPlane3D) plane, (GeoPolyhedron) p);
   algo.update();
   return algo.getOutput();
  }
  return null;
 }
 public GeoConic3D intersect(String label, GeoPlaneND plane, GeoQuadricND quadric) {
  GeoConic3D ret;
  if (quadric instanceof GeoQuadric3DPart) {
   AlgoIntersectPlaneQuadricPart algo =
     new AlgoIntersectPlaneQuadricPart(cons, (GeoPlane3D) plane, quadric);
   ret = algo.getConic();
  } else {
   AlgoIntersectPlaneQuadric algo = new AlgoIntersectPlaneQuadric(cons, plane, quadric);
   ret = algo.getConic();
  }
  ret.setLabel(label);
  return ret;
 }
 public GeoConicND intersectQuadricLimited(String label, GeoPlaneND plane, GeoQuadricND quadric) {
  AlgoIntersectPlaneQuadric algo =
    new AlgoIntersectPlaneQuadricLimited(cons, label, (GeoPlane3D) plane, quadric);
  return algo.getConic();
 }
 public GeoConicND intersectQuadricLimited(GeoPlaneND plane, GeoQuadricND quadric) {
  AlgoIntersectPlaneQuadric algo =
    new AlgoIntersectPlaneQuadricLimited(cons, (GeoPlane3D) plane, quadric);
  return algo.getConic();
 }
 public GeoConic3D intersect(GeoPlaneND plane, GeoQuadricND quadric) {
  AlgoIntersectPlaneQuadric algo = new AlgoIntersectPlaneQuadric(cons, plane, quadric);
  return algo.getConic();
 }
 public GeoElement[] intersectAsCircle(
   String[] labels, GeoQuadricND quadric1, GeoQuadricND quadric2) {
  AlgoIntersectQuadricsAsCircle algo =
    new AlgoIntersectQuadricsAsCircle(cons, labels, quadric1, quadric2);
  return algo.getOutput();
 }
 public GeoElement[] intersectAsCircle(GeoQuadricND quadric1, GeoQuadricND quadric2) {
  AlgoIntersectQuadricsAsCircle algo =
    new AlgoIntersectQuadricsAsCircle(cons, quadric1, quadric2);
  return algo.getOutput();
 }
 public final GeoFunctionNVar function2Var(
   String label,
   GeoNumberValue zcoord,
   GeoNumeric localVarU,
   GeoNumberValue Ufrom,
   GeoNumberValue Uto,
   GeoNumeric localVarV,
   GeoNumberValue Vfrom,
   GeoNumberValue Vto) {
  AlgoFunctionNVarND algo = new AlgoFunctionNVarND(
    cons,
    label,
    new GeoNumberValue[] {zcoord},
    new GeoNumeric[] {localVarU, localVarV},
    new GeoNumberValue[] {Ufrom, Vfrom},
    new GeoNumberValue[] {Uto, Vto});
  return algo.getFunction();
 }
 public final GeoFunctionNVar function2Var(
   String label,
   GeoFunctionNVar f,
   GeoNumberValue xFrom,
   GeoNumberValue xTo,
   GeoNumberValue yFrom,
   GeoNumberValue yTo) {
  AlgoFunctionNVarND algo = new AlgoFunctionNVarND(
    cons, label, f, new GeoNumberValue[] {xFrom, yFrom}, new GeoNumberValue[] {xTo, yTo});
  return algo.getFunction();
 }
 public final GeoCurveCartesian3D curveCartesian3D(
   GeoNumberValue xcoord,
   GeoNumberValue ycoord,
   GeoNumberValue zcoord,
   GeoNumeric localVar,
   GeoNumberValue from,
   GeoNumberValue to) {
  AlgoCurveCartesian3D algo = new AlgoCurveCartesian3D(
    cons, null, new GeoNumberValue[] {xcoord, ycoord, zcoord}, localVar, from, to);
  return (GeoCurveCartesian3D) algo.getCurve();
 }
 public GeoElement surfaceOfRevolution(Path function, GeoNumberValue angle, GeoLineND line) {
  AlgoSurfaceOfRevolution algo = new AlgoSurfaceOfRevolution(cons, function, angle, line);
  return algo.getSurface();
 }
 private AlgoIntersectLineConic3D getIntersectionAlgorithm(GeoLineND g, GeoConicND c) {
  AlgoElement existingAlgo = kernel.getAlgoDispatcher().findExistingIntersectionAlgorithm(g, c);
  if (existingAlgo != null) {
   return (AlgoIntersectLineConic3D) existingAlgo;
  }
  AlgoIntersectLineConic3D algo = new AlgoIntersectLineConic3D(cons, g, c);
  algo.setPrintedInXML(false);
  kernel.getAlgoDispatcher().addIntersectionAlgorithm(algo); 
  return algo;
 }
 public final GeoPoint3D[] intersectLineConic(String[] labels, GeoLineND g, GeoConicND c) {
  AlgoIntersectLineConic3D algo = getIntersectionAlgorithm(g, c);
  algo.setPrintedInXML(true);
  GeoPoint3D[] points = algo.getIntersectionPoints();
  LabelManager.setLabels(labels, points);
  return points;
 }
 public final GeoPoint3D intersectLineConicSingle(
   String label, GeoLineND g, GeoConicND c, double xRW, double yRW, CoordMatrix mat) {
  AlgoIntersectLineConic3D algo = getIntersectionAlgorithm(g, c);
  int index = algo.getClosestPointIndex(xRW, yRW, mat);
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, index);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 public final GeoPoint3D intersectLineConicSingle(
   String label, GeoLineND g, GeoConicND c, Coords origin, Coords direction) {
  AlgoIntersectLineConic3D algo = getIntersectionAlgorithm(g, c);
  int index = algo.getClosestPointIndex(origin, direction);
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, index);
  return salgo.getPoint();
 }
 public final GeoPoint3D intersectLineConicSingle(
   String label, GeoLineND g, GeoConicND c, NumberValue index) {
  return intersectLineConicSingle(label, g, c, (int) index.getDouble() - 1);
 }
 public final GeoPoint3D intersectLineConicSingle(
   String label, GeoLineND g, GeoConicND c, int index) {
  AlgoIntersectLineConic3D algo = getIntersectionAlgorithm(g, c); 
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, index);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 public GeoPoint3D intersectLineConicSingle(
   String label, GeoLineND g, GeoConicND c, GeoPointND refPoint) {
  AlgoIntersectLineConic3D algo = getIntersectionAlgorithm(g, c); 
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, refPoint);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 private AlgoIntersectConics3D getIntersectionAlgorithmConics(GeoConicND A, GeoQuadricND B) {
  AlgoElement existingAlgo = kernel.getAlgoDispatcher().findExistingIntersectionAlgorithm(A, B);
  if (existingAlgo != null) {
   return (AlgoIntersectConics3D) existingAlgo;
  }
  AlgoIntersectConics3D algo = new AlgoIntersectConics3D(cons, A, B);
  algo.setPrintedInXML(false);
  kernel.getAlgoDispatcher().addIntersectionAlgorithm(algo); 
  return algo;
 }
 public final GeoPoint3D[] intersectConics(String[] labels, GeoConicND A, GeoQuadricND B) {
  AlgoIntersectConics3D algo = getIntersectionAlgorithmConics(A, B);
  algo.setPrintedInXML(true);
  GeoPoint3D[] points = algo.getIntersectionPoints();
  LabelManager.setLabels(labels, points);
  return points;
 }
 public final GeoPoint3D intersectConicsSingle(
   String label, GeoConicND A, GeoQuadricND B, double xRW, double yRW, CoordMatrix mat) {
  AlgoIntersectConics3D algo = getIntersectionAlgorithmConics(A, B);
  int index = algo.getClosestPointIndex(xRW, yRW, mat);
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, index);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 public final GeoPoint3D intersectConicsSingle(
   String label, GeoConicND A, GeoQuadricND B, Coords origin, Coords direction) {
  AlgoIntersectConics3D algo = getIntersectionAlgorithmConics(A, B);
  int index = algo.getClosestPointIndex(origin, direction);
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, index);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 public final GeoPoint3D intersectConicsSingle(
   String label, GeoConicND A, GeoQuadricND B, NumberValue index) {
  return intersectConicsSingle(label, A, B, (int) index.getDouble() - 1);
 }
 public final GeoPoint3D intersectConicsSingle(
   String label, GeoConicND A, GeoQuadricND B, int index) {
  AlgoIntersectConics3D algo = getIntersectionAlgorithmConics(A, B); 
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, index);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 public final GeoPoint3D intersectConicsSingle(
   String label, GeoConicND A, GeoQuadricND B, GeoPointND refPoint) {
  AlgoIntersectConics3D algo = getIntersectionAlgorithmConics(A, B); 
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, refPoint);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 private AlgoIntersectLineQuadric3D getIntersectionAlgorithm(GeoLineND A, GeoQuadricND B) {
  AlgoElement existingAlgo = kernel.getAlgoDispatcher().findExistingIntersectionAlgorithm(A, B);
  if (existingAlgo != null) {
   return (AlgoIntersectLineQuadric3D) existingAlgo;
  }
  AlgoIntersectLineQuadric3D algo = new AlgoIntersectLineQuadric3D(cons, A, B);
  algo.setPrintedInXML(false);
  kernel.getAlgoDispatcher().addIntersectionAlgorithm(algo); 
  return algo;
 }
 public GeoPointND[] intersectLineQuadric(String[] labels, GeoLineND A, GeoQuadricND B) {
  AlgoIntersectLineQuadric3D algo = getIntersectionAlgorithm(A, B);
  algo.setPrintedInXML(true);
  GeoPoint3D[] points = algo.getIntersectionPoints();
  LabelManager.setLabels(labels, points);
  return points;
 }
 public final GeoPoint3D intersectLineQuadricSingle(
   String label, GeoLineND g, GeoQuadricND q, NumberValue index) {
  return intersectLineQuadricSingle(label, g, q, (int) index.getDouble() - 1);
 }
 public final GeoPoint3D intersectLineQuadricSingle(
   String label, GeoLineND g, GeoQuadricND q, int index) {
  AlgoIntersectLineQuadric3D algo = getIntersectionAlgorithm(g, q); 
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, index);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 public final GeoPoint3D intersectLineQuadricSingle(
   String label, GeoLineND g, GeoQuadricND q, double xRW, double yRW, CoordMatrix4x4 mat) {
  AlgoIntersectLineQuadric3D algo = getIntersectionAlgorithm(g, q);
  int index = algo.getClosestPointIndex(xRW, yRW, mat);
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, index);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 public final GeoPoint3D intersectLineQuadricSingle(
   String label, GeoLineND g, GeoQuadricND q, Coords origin, Coords direction) {
  AlgoIntersectLineQuadric3D algo = getIntersectionAlgorithm(g, q);
  int index = algo.getClosestPointIndex(origin, direction);
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, index);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 public final GeoPoint3D intersectLineQuadricSingle(
   String label, GeoLineND g, GeoQuadricND q, GeoPointND refPoint) {
  AlgoIntersectLineQuadric3D algo = getIntersectionAlgorithm(g, q); 
  AlgoIntersectSingle3D salgo = new AlgoIntersectSingle3D(label, algo, refPoint);
  GeoPoint3D point = salgo.getPoint();
  return point;
 }
 private AlgoIntersectPlaneConic getIntersectionAlgorithm(GeoCoordSys2D A, GeoConicND B) {
  AlgoElement existingAlgo = kernel.getAlgoDispatcher().findExistingIntersectionAlgorithm(A, B);
  if (existingAlgo != null) {
   return (AlgoIntersectPlaneConic) existingAlgo;
  }
  AlgoIntersectPlaneConic algo = new AlgoIntersectPlaneConic(cons, A, B);
  algo.setPrintedInXML(false);
  kernel.getAlgoDispatcher().addIntersectionAlgorithm(algo); 
  return algo;
 }
 private AlgoIntersectPlaneCurve getIntersectionAlgorithmCurve(
   GeoCoordSys2D A, GeoCurveCartesianND B, String[] labels) {
  AlgoElement existingAlgo = kernel.getAlgoDispatcher().findExistingIntersectionAlgorithm(A, B);
  if (existingAlgo != null) {
   return (AlgoIntersectPlaneCurve) existingAlgo;
  }
  AlgoIntersectPlaneCurve algo = new AlgoIntersectPlaneCurve(cons, A, B, labels);
  algo.setPrintedInXML(false);
  kernel.getAlgoDispatcher().addIntersectionAlgorithm(algo); 
  return algo;
 }
 public GeoPointND[] intersectPlaneConic(String[] labels, GeoCoordSys2D A, GeoConicND B) {
  AlgoIntersectPlaneConic algo = getIntersectionAlgorithm(A, B);
  algo.setPrintedInXML(true);
  GeoPoint3D[] points = algo.getIntersectionPoints();
  LabelManager.setLabels(labels, points);
  return points;
 }
 public GeoElementND[] intersectPlaneCurve(
   String[] labels, GeoCoordSys2D A, GeoCurveCartesianND B) {
  AlgoIntersectPlaneCurve algo = getIntersectionAlgorithmCurve(A, B, labels);
  algo.setPrintedInXML(true);
  GeoElementND[] points = algo.getOutput();
  return points;
 }
 public final GeoElement intersectPlanes(String label, GeoPlaneND cs1, GeoPlaneND cs2) {
  AlgoIntersectPlanes algo = new AlgoIntersectPlanes(cons, label, cs1, cs2);
  return algo.getIntersection();
 }
 public final GeoElement intersectPlanes(GeoPlaneND cs1, GeoPlaneND cs2) {
  AlgoIntersectPlanes algo = new AlgoIntersectPlanes(cons, cs1, cs2);
  return algo.getIntersection();
 }
 public GeoElement closestPoint(String label, GeoLineND g, GeoLineND h) {
  AlgoClosestPointLines3D algo = new AlgoClosestPointLines3D(cons, label, g, h);
  return algo.getPoint();
 }
 public GeoPoint3D closestPoint(String label, Path p, GeoPointND point) {
  AlgoClosestPoint3D algo = new AlgoClosestPoint3D(cons, p, point);
  algo.getP().setLabel(label);
  return (GeoPoint3D) algo.getP();
 }
 public GeoPointND closestPoint(String label, Region r, GeoPointND point) {
  AlgoClosestPointToRegion3D algo = new AlgoClosestPointToRegion3D(cons, label, r, point);
  return algo.getOutputPoint();
 }
 public final GeoAngle angle3D(String label, GeoPointND A, GeoPointND B, GeoPointND C) {
  AlgoAnglePoints3D algo = new AlgoAnglePoints3D(cons, A, B, C);
  GeoAngle angle = algo.getAngle();
  angle.setLabel(label);
  return angle;
 }
 public final GeoAngle angle3D(
   String label,
   GeoPointND leg1,
   GeoPointND vertex,
   GeoPointND leg2,
   GeoDirectionND orientation) {
  AlgoAnglePoints3DOrientation algo =
    new AlgoAnglePoints3DOrientation(cons, leg1, vertex, leg2, orientation);
  GeoAngle angle = algo.getAngle();
  angle.setLabel(label);
  return angle;
 }
 public final GeoElement[] angle(
   String[] labels,
   GeoPointND B,
   GeoPointND A,
   GeoNumberValue alpha,
   GeoDirectionND orientation,
   boolean posOrientation) {
  String pointLabel = null, angleLabel = null;
  if (labels != null) {
   switch (labels.length) {
    case 2:
     angleLabel = labels[0];
     pointLabel = labels[1];
     break;
    case 1:
     angleLabel = labels[0];
     break;
    default:
   }
  }
  GeoPointND C = (GeoPointND) rotate3D(pointLabel, B, alpha, A, orientation)[0];
  GeoAngle angle;
  if (posOrientation) {
   angle = angle3D(angleLabel, B, A, C, orientation);
  } else {
   angle = angle3D(angleLabel, C, A, B, orientation);
  }
  GeoElement[] ret = {angle, (GeoElement) C};
  return ret;
 }
 public final GeoAngle angle3D(String label, GeoLineND g, GeoLineND h) {
  AlgoAngleLines3D algo = new AlgoAngleLines3D(cons, g, h);
  GeoAngle angle = algo.getAngle();
  angle.setLabel(label);
  return angle;
 }
 public final GeoAngle angle3D(
   String label, GeoLineND g, GeoLineND h, GeoDirectionND orientation) {
  AlgoAngleLines3D algo = new AlgoAngleLines3DOrientation(cons, g, h, orientation);
  GeoAngle angle = algo.getAngle();
  angle.setLabel(label);
  return angle;
 }
 public final GeoAngle angle3D(String label, GeoPlaneND p1, GeoPlaneND p2) {
  AlgoAnglePlanes algo = new AlgoAnglePlanes(cons, (GeoPlane3D) p1, (GeoPlane3D) p2);
  GeoAngle angle = algo.getAngle();
  angle.setLabel(label);
  return angle;
 }
 public final GeoAngle angle3D(String label, GeoLineND l, GeoPlaneND p) {
  AlgoAngleLinePlane algo = new AlgoAngleLinePlane(cons, label, l, (GeoPlane3D) p);
  GeoAngle angle = algo.getAngle();
  return angle;
 }
 public GeoAngle createLineAngle(GeoLineND line1, GeoLineND line2) {
  GeoAngle angle = null;
  if ((line1 instanceof GeoSegmentND) && (line2 instanceof GeoSegmentND)) {
   GeoSegmentND a = (GeoSegmentND) line1;
   GeoSegmentND b = (GeoSegmentND) line2;
   GeoPointND a1 = a.getStartPoint();
   GeoPointND a2 = a.getEndPoint();
   GeoPointND b1 = b.getStartPoint();
   GeoPointND b2 = b.getEndPoint();
   if (a1 == b1) {
    angle = angle3D(null, a2, a1, b2);
   } else if (a1 == b2) {
    angle = angle3D(null, a2, a1, b1);
   } else if (a2 == b1) {
    angle = angle3D(null, a1, a2, b2);
   } else if (a2 == b2) {
    angle = angle3D(null, a1, a2, b1);
   }
  }
  if (angle == null) {
   angle = angle3D(null, line1, line2);
  }
  return angle;
 }
 public GeoAngle createLineAngle(GeoLineND line1, GeoLineND line2, GeoDirectionND orientation) {
  GeoAngle angle = null;
  if ((line1 instanceof GeoSegmentND) && (line2 instanceof GeoSegmentND)) {
   GeoSegmentND a = (GeoSegmentND) line1;
   GeoSegmentND b = (GeoSegmentND) line2;
   GeoPointND a1 = a.getStartPoint();
   GeoPointND a2 = a.getEndPoint();
   GeoPointND b1 = b.getStartPoint();
   GeoPointND b2 = b.getEndPoint();
   if (a1 == b1) {
    angle = angle3D(null, a2, a1, b2, orientation);
   } else if (a1 == b2) {
    angle = angle3D(null, a2, a1, b1, orientation);
   } else if (a2 == b1) {
    angle = angle3D(null, a1, a2, b2, orientation);
   } else if (a2 == b2) {
    angle = angle3D(null, a1, a2, b1, orientation);
   }
  }
  if (angle == null) {
   angle = angle3D(null, line1, line2, orientation);
  }
  return angle;
 }
 public final GeoAngle angle3D(String label, GeoVectorND v, GeoVectorND w) {
  AlgoAngleVectors3D algo = new AlgoAngleVectors3D(cons, v, w);
  GeoAngle angle = algo.getAngle();
  angle.setLabel(label);
  return angle;
 }
 public final GeoAngle angle3D(
   String label, GeoVectorND v, GeoVectorND w, GeoDirectionND orientation) {
  AlgoAngleVectors3D algo = new AlgoAngleVectors3DOrientation(cons, v, w, orientation);
  GeoAngle angle = algo.getAngle();
  angle.setLabel(label);
  return angle;
 }
 public final GeoElement[] angles3D(String[] labels, GeoPolygon poly) {
  AlgoAnglePolygon3D algo = new AlgoAnglePolygon3D(cons, labels, poly);
  GeoElement[] angles = algo.getAngles();
  return angles;
 }
 public final GeoElement[] angles3D(String[] labels, GeoPolygon poly, GeoDirectionND orientation) {
  AlgoAnglePolygon3D algo = new AlgoAnglePolygon3DOrientation(cons, labels, poly, orientation);
  GeoElement[] angles = algo.getAngles();
  return angles;
 }
 public GeoElement[] angles3D(String[] labels, GeoPolygon poly, boolean internalAngle) {
  AlgoAnglePolygon3D algo = new AlgoAnglePolygon3D(cons, labels, poly, internalAngle);
  GeoElement[] angles = algo.getAngles();
  return angles;
 }
 public final GeoNumeric length(String label, GeoVectorND v) {
  AlgoLengthVector3D algo = new AlgoLengthVector3D(cons, label, v);
  GeoNumeric num = algo.getLength();
  return num;
 }
 public final GeoElement[] archimedeanSolid(
   String[] labels, GeoPointND A, GeoPointND B, GeoDirectionND v, Commands name) {
  AlgoArchimedeanSolid algo = new AlgoArchimedeanSolid(cons, labels, A, B, v, name);
  return algo.getOutput();
 }
 public GeoElement[] archimedeanSolid(
   String[] labels, GeoPolygon poly, GeoBoolean direct, Commands name) {
  AlgoArchimedeanSolid algo = new AlgoArchimedeanSolid(cons, labels, poly, direct, name);
  return algo.getOutput();
 }
 public final GeoElement[] archimedeanSolid(
   String[] labels, GeoPointND A, GeoPointND B, GeoPointND C, Commands name) {
  AlgoArchimedeanSolidThreePoints algo =
    new AlgoArchimedeanSolidThreePoints(cons, labels, A, B, C, name);
  return algo.getOutput();
 }
 public final GeoElement[] archimedeanSolid(
   String[] labels, GeoPointND A, GeoPointND B, Commands name) {
  GeoSegmentND segAB;
  if (A.isGeoElement3D() || B.isGeoElement3D()) {
   AlgoJoinPoints3D algoSegment = new AlgoJoinPoints3D(cons, A, B, null, GeoClass.SEGMENT3D);
   cons.removeFromConstructionList(algoSegment);
   segAB = (GeoSegmentND) algoSegment.getCS();
  } else {
   AlgoJoinPointsSegment algoSegment =
     new AlgoJoinPointsSegment(cons, (GeoPoint) A, (GeoPoint) B, null, false);
   segAB = algoSegment.getSegment();
  }
  AlgoDistancePoints algoDistance = new AlgoDistancePoints(cons, A, B);
  cons.removeFromConstructionList(algoDistance);
  GeoNumeric distance = algoDistance.getDistance();
  GeoPointND center;
  GeoNumberValue radius;
  switch (name) {
   case Tetrahedron:
   case Octahedron:
   case Icosahedron:
    if (A.isGeoElement3D() || B.isGeoElement3D()) {
     AlgoMidpoint3D algoMidpoint = new AlgoMidpoint3D(cons, A, B);
     cons.removeFromConstructionList(algoMidpoint);
     center = algoMidpoint.getPoint();
    } else {
     AlgoMidpoint algoMidpoint = new AlgoMidpoint(cons, (GeoPoint) A, (GeoPoint) B);
     cons.removeFromConstructionList(algoMidpoint);
     center = algoMidpoint.getPoint();
    }
    ExpressionNode expr =
      new ExpressionNode(kernel, new MyDouble(kernel, 3), Operation.SQRT, null);
    expr = expr.divide(2).multiply(distance);
    AlgoDependentNumber exprAlgo = new AlgoDependentNumber(cons, expr, false);
    cons.removeFromConstructionList(exprAlgo);
    radius = exprAlgo.getNumber();
    break;
   case Cube:
   default:
    center = B;
    radius = distance;
    break;
   case Dodecahedron:
    ExpressionNode exprSqrt5 =
      new ExpressionNode(kernel, new MyDouble(kernel, 5), Operation.SQRT, null);
    expr = new ExpressionNode(kernel, new MyDouble(kernel, 1), Operation.NO_OPERATION, null);
    ExpressionNode exprPoint = new ExpressionNode(kernel, A, Operation.NO_OPERATION, null);
    expr = expr.subtract(exprSqrt5).multiply(exprPoint);
    ExpressionNode expr2 =
      new ExpressionNode(kernel, new MyDouble(kernel, 3), Operation.NO_OPERATION, null);
    exprPoint = new ExpressionNode(kernel, B, Operation.NO_OPERATION, null);
    expr2 = expr2.plus(exprSqrt5).multiply(exprPoint);
    expr = expr.plus(expr2).divide(4);
    if (A.isGeoElement3D() || B.isGeoElement3D()) {
     AlgoDependentPoint3D exprAlgoPoint = new AlgoDependentPoint3D(cons, expr, false);
     center = exprAlgoPoint.getPoint3D();
    } else {
     AlgoDependentPoint exprAlgoPoint = new AlgoDependentPoint(cons, expr, false);
     cons.removeFromConstructionList(exprAlgoPoint);
     center = exprAlgoPoint.getPoint();
    }
    expr = new ExpressionNode(kernel, new MyDouble(kernel, 10), Operation.NO_OPERATION, null);
    expr2 = new ExpressionNode(kernel, new MyDouble(kernel, 2), Operation.NO_OPERATION, null);
    expr = expr.plus(exprSqrt5.multiply(expr2)).sqrt().divide(4).multiply(distance);
    exprAlgo = new AlgoDependentNumber(cons, expr, false);
    cons.removeFromConstructionList(exprAlgo);
    radius = exprAlgo.getNumber();
    break;
  }
  AlgoCircle3DPointRadiusDirection algoCircle =
    new AlgoCircle3DPointRadiusDirection(cons, center, radius, segAB);
  cons.removeFromConstructionList(algoCircle);
  Coords cA = A.getInhomCoordsInD3();
  Coords cB = B.getInhomCoordsInD(3);
  createTmpCoords();
  tmpCoords2.setSub3(cB, cA);
  tmpCoords2.completeOrthonormalKeepInXOYPlaneIfPossible3(tmpCoords3);
  tmpCoords3.mulInside(radius.getDouble());
  tmpCoords.setAdd3(center.getInhomCoordsInD(3), tmpCoords3);
  AlgoPoint3DOnPath algoPoint = new AlgoPoint3DOnPath(
    cons, algoCircle.getCircle(), tmpCoords.getX(), tmpCoords.getY(), tmpCoords.getZ());
  algoPoint.getP().setLabel(null);
  ((GeoElement) algoPoint.getP()).setAuxiliaryObject(Auxiliary.YES_SAVE);
  AlgoArchimedeanSolidThreePoints algo =
    new AlgoArchimedeanSolidThreePoints(cons, labels, A, B, algoPoint.getP(), name);
  return algo.getOutput();
 }
 private void createTmpCoords() {
  if (tmpCoords == null) {
   tmpCoords = new Coords(3);
   tmpCoords2 = new Coords(3);
   tmpCoords3 = new Coords(3);
  }
 }
 public GeoNumeric distance(String label, GeoPointND point, GeoPlaneND plane) {
  AlgoDistancePointPlane3D algo = new AlgoDistancePointPlane3D(cons, point, plane);
  algo.getDistance().setLabel(label);
  return algo.getDistance();
 }
 public final GeoElement[] translate3D(String label, GeoElementND geoTrans, GeoVectorND v) {
  Transform t = new TransformTranslate3D(cons, v);
  return t.transform(geoTrans, label);
 }
 public Geo3DVecInterface newGeo3DVec(double x, double y, double z) {
  return new Geo3DVec(kernel, x, y, z);
 }
 public final GeoElement[] rotate3D(
   String label,
   GeoElementND geoRot,
   GeoNumberValue phi,
   GeoPointND center,
   GeoDirectionND orientation) {
  Transform t = new TransformRotate3D(cons, phi, center, orientation);
  return t.transform(geoRot, label);
 }
 public final GeoElement[] rotate3D(
   String label, GeoElementND geoRot, GeoNumberValue phi, GeoLineND line) {
  Transform t = new TransformRotate3D(cons, phi, line);
  return t.transform(geoRot, label);
 }
 public final GeoElement[] mirror3D(String label, GeoElement geo, GeoPointND p) {
  Transform t = new TransformMirror3D(cons, p);
  return t.transform(geo, label);
 }
 public final GeoElement[] mirror3D(String label, GeoElement geo, GeoLineND line) {
  Transform t = new TransformMirror3D(cons, line);
  return t.transform(geo, label);
 }
 public final GeoElement[] mirror3D(String label, GeoElement geo, GeoCoordSys2D plane) {
  Transform t = new TransformMirror3D(cons, plane);
  return t.transform(geo, label);
 }
 public final GeoElement[] dilate3D(
   String label, GeoElement geoDil, GeoNumberValue r, GeoPointND S) {
  Transform t = new TransformDilate3D(cons, r, S);
  return t.transform(geoDil, label);
 }
 public final GeoNumeric volume(String label, HasVolume hasVolume) {
  AlgoVolume algo = new AlgoVolume(cons, label, hasVolume);
  return algo.getVolume();
 }
 public final GeoNumeric orientedHeight(String label, HasHeight hasHeight) {
  AlgoOrientedHeight algo = new AlgoOrientedHeight(cons, hasHeight);
  algo.getOrientedHeight().setLabel(label);
  return algo.getOrientedHeight();
 }
 public final GeoPoint3D[] corner(String[] labels, GeoConicND conic) {
  AlgoCornerConicSection algo = new AlgoCornerConicSection(cons, labels, (GeoConicSection) conic);
  return algo.getCorners();
 }
 public final GeoElement[] regularPolygon(
   String[] labels, GeoPointND A, GeoPointND B, GeoNumberValue n, GeoDirectionND direction) {
  kernel.batchAddStarted();
  AlgoPolygonRegular3D algo = new AlgoPolygonRegular3D(cons, labels, A, B, n, direction);
  kernel.batchAddComplete();
  return algo.getOutput();
 }
 public GeoElement[] polyhedronNet(
   String[] labels,
   GeoElement p,
   NumberValue v,
   GeoPolygon bottomFace,
   GeoSegmentND[] pivotSegments) {
  AlgoElement algo;
  switch (((GeoPolyhedron) p).getType()) {
   case PYRAMID:
    algo = new AlgoPolyhedronNetPyramid(cons, labels, (GeoPolyhedron) p, v);
    return algo.getOutput();
   case PRISM:
    algo = new AlgoPolyhedronNetPrism(cons, labels, (GeoPolyhedron) p, v);
    return algo.getOutput();
   default:
    algo = new AlgoPolyhedronNetConvex(
      cons, labels, (GeoPolyhedron) p, v, bottomFace, pivotSegments);
    return algo.getOutput();
  }
 }
 public GeoElement[] polyhedronConvex(String[] labels, GeoElement[] pointList) {
  AlgoElement algo = new AlgoPolyhedronConvex(cons, labels, pointList);
  return algo.getOutput();
 }
 public final GeoConicPart3D circumcircleArc3D(
   String label, GeoPointND A, GeoPointND B, GeoPointND C) {
  AlgoConicPartCircumcircle3D algo =
    new AlgoConicPartCircumcircle3D(cons, label, A, B, C, GeoConicNDConstants.CONIC_PART_ARC);
  return algo.getConicPart();
 }
 public final GeoConicPart3D circumcircleSector3D(
   String label, GeoPointND A, GeoPointND B, GeoPointND C) {
  AlgoConicPartCircumcircle3D algo = new AlgoConicPartCircumcircle3D(
    cons, label, A, B, C, GeoConicNDConstants.CONIC_PART_SECTOR);
  return algo.getConicPart();
 }
 public final GeoElement[] angularBisector3D(String[] labels, GeoLineND g, GeoLineND h) {
  AlgoAngularBisectorLines3D algo = new AlgoAngularBisectorLines3D(cons, labels, g, h);
  GeoLine3D[] lines = algo.getLines();
  return lines;
 }
 public final GeoLine3D angularBisector3D(String label, GeoPointND A, GeoPointND B, GeoPointND C) {
  AlgoAngularBisectorPoints3D algo = new AlgoAngularBisectorPoints3D(cons, label, A, B, C);
  return algo.getLine();
 }
 public final GeoLine3D angularBisector3D(
   String label, GeoPointND A, GeoPointND B, GeoPointND C, GeoDirectionND orientation) {
  AlgoAngularBisectorPoints3DOrientation algo =
    new AlgoAngularBisectorPoints3DOrientation(cons, label, A, B, C, orientation);
  return algo.getLine();
 }
 public final GeoConicPart3D circleArcSector3D(
   String label, GeoPointND A, GeoPointND B, GeoPointND C, int type) {
  AlgoConicPartCircle3D algo = new AlgoConicPartCircle3D(cons, label, A, B, C, type);
  return algo.getConicPart();
 }
 public final GeoConicPartND circleArcSector3D(
   String label,
   GeoPointND A,
   GeoPointND B,
   GeoPointND C,
   GeoDirectionND orientation,
   int type) {
  if (A.isGeoElement3D() || B.isGeoElement3D() || C.isGeoElement3D()) { 
   if (orientation == kernel.getSpace()) { 
    return circleArcSector3D(null, A, B, C, type);
   }
   AlgoConicPartCircle3D algo =
     new AlgoConicPartCircle3DOrientation(cons, label, A, B, C, orientation, type);
   return algo.getConicPart();
  }
  if (orientation == kernel.getXOYPlane()) { 
   return kernel
     .getAlgoDispatcher()
     .circleArcSector(label, (GeoPoint) A, (GeoPoint) B, (GeoPoint) C, type);
  }
  AlgoConicPartCircle3D algo =
    new AlgoConicPartCircle3DOrientation(cons, label, A, B, C, orientation, type);
  return algo.getConicPart();
 }
 public GeoLine3D line3D(
   String label, ExpressionValue[] coefX, ExpressionValue[] coefY, ExpressionValue[] coefZ) {
  MyVec3DNode start = new MyVec3DNode(kernel, coefX[0], coefY[0], coefZ[0]);
  MyVec3DNode v = new MyVec3DNode(kernel, coefX[1], coefY[1], coefZ[1]);
  AlgoDependentPoint3D pt = new AlgoDependentPoint3D(cons, start.wrap(), false);
  AlgoDependentVector3D vec = new AlgoDependentVector3D(cons, v.wrap());
  cons.removeFromConstructionList(vec);
  AlgoLinePointVector3D algo =
    new AlgoLinePointVector3D(cons, pt.getPoint3D(), vec.getVector3D());
  GeoLine3D g = algo.getLine();
  g.setLabel(label);
  return g;
 }
 public final GeoConicPartND semicircle3D(
   String label, GeoPointND A, GeoPointND B, GeoDirectionND orientation) {
  if (A.isGeoElement3D() || B.isGeoElement3D()) { 
   AlgoSemicircle3D algo = new AlgoSemicircle3D(cons, label, A, B, orientation);
   return algo.getSemicircle();
  }
  if (orientation == kernel.getXOYPlane()) { 
   return kernel.getAlgoDispatcher().semicircle(label, (GeoPoint) A, (GeoPoint) B);
  }
  AlgoSemicircle3D algo = new AlgoSemicircle3D(cons, label, A, B, orientation);
  return algo.getSemicircle();
 }
 public final GeoElement[] tangent3D(String[] labels, GeoPointND P, GeoConicND c) {
  if (P.isGeoElement3D() || c.isGeoElement3D()) {
   AlgoTangentPoint3D algo = new AlgoTangentPoint3D(cons, labels, P, c);
   return algo.getOutput();
  }
  return kernel.getAlgoDispatcher().tangent(labels, P, c);
 }
 public GeoElement[] tangent3D(String[] labels, GeoLineND l, GeoConicND c) {
  if (l.isGeoElement3D() || c.isGeoElement3D()) {
   AlgoTangentLine3D algo = new AlgoTangentLine3D(cons, labels, l, c);
   return algo.getOutput();
  }
  return kernel.getAlgoDispatcher().tangent(labels, l, c);
 }
 public final GeoElement[] commonTangents3D(String[] labels, GeoConicND c1, GeoConicND c2) {
  if (c1.isGeoElement3D() || c2.isGeoElement3D()) {
   AlgoCommonTangents3D algo = new AlgoCommonTangents3D(cons, labels, c1, c2);
   return algo.getOutput();
  }
  return kernel.getAlgoDispatcher().commonTangents(labels, c1, c2);
 }
 public final GeoElement diameterLine3D(String label, GeoLineND g, GeoConicND c) {
  if (g.isGeoElement3D() || c.isGeoElement3D()) {
   AlgoDiameterLine3D algo = new AlgoDiameterLine3D(cons, label, c, g);
   return (GeoElement) algo.getDiameter();
  }
  return kernel.getAlgoDispatcher().diameterLine(label, g, c);
 }
 public final GeoElement diameterLine3D(String label, GeoVectorND v, GeoConicND c) {
  if (v.isGeoElement3D() || c.isGeoElement3D()) {
   AlgoDiameterVector3D algo = new AlgoDiameterVector3D(cons, label, c, v);
   return (GeoElement) algo.getDiameter();
  }
  return kernel.getAlgoDispatcher().diameterLine(label, v, c);
 }
 public final GeoElement lineBisector3D(
   String label, GeoSegmentND segment, GeoDirectionND orientation) {
  if (!segment.isGeoElement3D() 
    && orientation == kernel.getXOYPlane()) { 
   return kernel.getAlgoDispatcher().lineBisector(label, (GeoSegment) segment);
  }
  AlgoLineBisectorSegmentDirection3D algo =
    new AlgoLineBisectorSegmentDirection3D(cons, label, segment, orientation);
  return algo.getLine();
 }
 public final GeoElement lineBisector3D(
   String label, GeoPointND a, GeoPointND b, GeoDirectionND orientation) {
  if (!a.isGeoElement3D()
    && !b.isGeoElement3D() 
    && orientation == kernel.getXOYPlane()) { 
   return kernel.getAlgoDispatcher().lineBisector(label, (GeoPoint) a, (GeoPoint) b);
  }
  AlgoLineBisectorTwoPointsDirection3D algo =
    new AlgoLineBisectorTwoPointsDirection3D(cons, label, a, b, orientation);
  return algo.getLine();
 }
 public final GeoConicND conic3D(String label, GeoPointND[] points) {
  AlgoConicFivePoints3D algo = new AlgoConicFivePoints3D(cons, points);
  algo.getConic().setLabel(label);
  return algo.getConic();
 }
 public final GeoConicND ellipseHyperbola3D(
   String label, GeoPointND A, GeoPointND B, GeoPointND C, final int type) {
  AlgoEllipseHyperbolaFociPoint3D algo =
    new AlgoEllipseHyperbolaFociPoint3D(cons, label, A, B, C, type);
  return algo.getConic();
 }
 public final GeoConicND ellipseHyperbola3D(
   String label,
   GeoPointND A,
   GeoPointND B,
   GeoPointND C,
   GeoDirectionND orientation,
   final int type) {
  if (!A.isGeoElement3D()
    && !B.isGeoElement3D()
    && !C.isGeoElement3D() 
    && orientation == kernel.getXOYPlane()) { 
   return kernel.getAlgoDispatcher().ellipseHyperbola(null, A, B, C, type);
  }
  if (orientation == kernel.getSpace()) { 
   return ellipseHyperbola3D(null, A, B, C, type);
  }
  AlgoEllipseHyperbolaFociPoint3DOriented algo =
    new AlgoEllipseHyperbolaFociPoint3DOriented(cons, label, A, B, C, orientation, type);
  return algo.getConic();
 }
 public final GeoConicND parabola3D(String label, GeoPointND F, GeoLineND l) {
  AlgoParabolaPointLine3D algo = new AlgoParabolaPointLine3D(cons, label, F, l);
  return algo.getParabola();
 }
 public final GeoElement locus3D(String label, GeoPointND Q, GeoPointND P) {
  if (!AlgoDispatcher.locusCheck(P, Q)) {
   return null;
  }
  return new AlgoLocus3D(cons, label, Q, P).getLocus();
 }
 public GeoElement tangent3D(String label, GeoPointND point, GeoCurveCartesianND curve) {
  if (curve.isGeoElement3D()) {
   AlgoTangentCurve3D algo =
     new AlgoTangentCurve3D(cons, label, point, (GeoCurveCartesian3D) curve);
   algo.update();
   return algo.getOutput()[0];
  }
  return kernel.tangent(label, point, (GeoCurveCartesian) curve);
 }
 public GeoElement lineToPlane(GeoElement geoElement) {
  GeoLine line = (GeoLine) geoElement;
  GeoPlane3D plane = new GeoPlane3D(cons, line.getX(), line.getY(), 0, line.getZ());
  if (line.getDefinition() != null) {
   ExpressionValue eq = geoElement.getDefinition().unwrap();
   if (eq instanceof Equation) {
    plane.setDefinition(eq.wrap());
   }
  }
  return plane;
 }
 public AlgoElement intersectFunctionNVarPlane(
   Construction cons, GeoFunctionNVar function, GeoPlaneND plane) {
  return new AlgoIntersectFunctionNVarPlane(cons, function, plane);
 }
 public GeoElement locus3D(String label, GeoPointND Q, GeoNumeric slider) {
  return new AlgoLocusSlider3D(cons, label, Q, slider).getLocus();
 }
 public GeoElement[] intersectPolygons(String[] labels, GeoPoly inPoly0, GeoPoly inPoly1) {
  AlgoIntersectPathPolygons3D algo =
    new AlgoIntersectPathPolygons3D(cons, labels, inPoly0, inPoly1);
  return algo.getOutput();
 }
 public GeoElement[] differencePolygons(String[] labels, GeoPolygon inPoly0, GeoPolygon inPoly1) {
  AlgoDifferencePolygons3D algo = new AlgoDifferencePolygons3D(cons, labels, inPoly0, inPoly1);
  return algo.getOutput();
 }
 public GeoElement[] differencePolygons(
   String[] labels, GeoPolygon inPoly0, GeoPolygon inPoly1, GeoBoolean exclusive) {
  AlgoDifferencePolygons3D algo =
    new AlgoDifferencePolygons3D(cons, labels, inPoly0, inPoly1, exclusive);
  return algo.getOutput();
 }
 public GeoElement[] unionPolygons(String[] labels, GeoPoly inPoly0, GeoPoly inPoly1) {
  AlgoUnionPolygons3D algo = new AlgoUnionPolygons3D(cons, labels, inPoly0, inPoly1);
  return algo.getOutput();
 }
 public GeoElement[] intersectionPoint(String[] labels, GeoPolygon poly0, GeoPolygon poly1) {
  AlgoIntersectPolygons3D algo = new AlgoIntersectPolygons3D(cons, labels, poly0, poly1);
  return algo.getOutput();
 }
 public GeoNumeric distance(String label, GeoPlaneND a, GeoPlaneND b) {
  AlgoDistancePlanes algo = new AlgoDistancePlanes(cons, a, b);
  algo.getDistance().setLabel(label);
  return algo.getDistance();
 }
 public GeoElement[] intersectPlaneImplicitSurface(
   GeoPlaneND plane, GeoImplicitSurfaceND surface) {
  return new AlgoIntersectImplicitSurfacePlane(cons, (GeoImplicitSurface) surface, plane)
    .getOutput();
 }
}
```

### FILE: geogebra3D/kernel3D/algos/RotationConverter.java
```java
public class RotationConverter implements CoordConverter {
 public static final double SNAP_PRECISION = 5 * Kernel.PI_180;
 private GeoLineND axis;
 private Coords rotationCenter = new Coords(3);
 private Coords vStart = new Coords(3);
 private Coords vCurrent = new Coords(3);
 private Coords result = Coords.createInhomCoorsInD3();
 private Coords lastStartPoint = Coords.createInhomCoorsInD3();
 private Coords crossProduct = new Coords(4);
 private Coords vStartNormalized = new Coords(4);
 public RotationConverter(GeoLineND axis) {
  this.axis = axis;
 }
 public double translationToValue(
   Coords direction, Coords rwTransVec, double startValue, EuclidianView view) {
  vCurrent.setAdd3(vStart, rwTransVec);
  double sin = direction.dotCrossProduct(vStart, vCurrent);
  double cos = vStart.dotproduct3(vCurrent);
  return snap(DoubleUtil.convertToAngleValue(Math.atan2(sin, cos) + startValue), view);
 }
 public double snap(double val, EuclidianView view) {
  double roundedVal = Math.round(val / Kernel.PI_HALF) * Kernel.PI_HALF;
  if (DoubleUtil.isEqual(val, roundedVal, SNAP_PRECISION)) {
   return roundedVal;
  }
  return val;
 }
 public void record(ChangeableParent parent, Coords startPoint) {
  startPoint.projectLine(axis.getStartInhomCoords(), axis.getDirectionInD3(), rotationCenter);
  vStart.setSub3(startPoint, rotationCenter);
  lastStartPoint.set3(startPoint);
 }
 public void updateTranslation(
   Coords startPoint3D,
   Coords direction,
   Coords rayOrigin,
   Coords rayDirection,
   Coords translationVec3D) {
  crossProduct.setCrossProduct3(vStart, direction);
  vStartNormalized.set3(vStart);
  vStartNormalized.normalize();
  rayOrigin.projectPlane(vStartNormalized, crossProduct, rayDirection, startPoint3D, result);
  if (DoubleUtil.isZero(result.getW())) {
   translationVec3D.setUndefined();
  } else {
   translationVec3D.setSub3(result, startPoint3D);
  }
 }
}
```
