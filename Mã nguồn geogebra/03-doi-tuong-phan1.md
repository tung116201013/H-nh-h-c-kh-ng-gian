# 03-doi-tuong-phan1.md

Nguồn: GeoGebra (EUPL v1.2). Mã Java đã bỏ bình luận/import để gọn. Chỉ để ĐỌC lấy ý tưởng thuật toán, viết lại bằng JavaScript.

Nội dung: Các đối tượng hình học 3D (Geo*): điểm, đường, đoạn, mặt phẳng, đa giác, đa diện, mặt cầu/nón/trụ

Danh sách file trong phần này:
- Geo3DVec.java
- GeoAngle3D.java
- GeoAxis3D.java
- GeoClippingCube3D.java
- GeoConic3D.java
- GeoConicPart3D.java
- GeoConicSection.java
- GeoCoordSys1D.java
- GeoCursor3D.java
- GeoCurveCartesian3D.java
- GeoElement3D.java
- GeoLine3D.java
- GeoLocus3D.java
- GeoPlane3D.java
- GeoPlane3DConstant.java
- GeoPoint3D.java
- GeoPolyLine3D.java
- GeoPolygon3D.java
- GeoPolyhedron.java
- GeoPolyhedronNet.java
- GeoQuadric3D.java
- GeoQuadric3DLimited.java
- GeoQuadric3DLimitedOrPart.java
- GeoQuadric3DPart.java
- GeoRay3D.java
- GeoSegment3D.java
- GeoSpace.java
- GeoSurfaceCartesian3D.java
- GeoTriangulatedSurface3D.java
- GeoVec4D.java

### FILE: geogebra3D/kernel3D/geos/Geo3DVec.java
```java
public final class Geo3DVec extends ValidExpression implements Vector3DValue, Geo3DVecInterface {
 private double x = Double.NaN;
 private double y = Double.NaN;
 private double z = Double.NaN;
 private int mode = Kernel.COORD_CARTESIAN_3D;
 private StringBuilder sbToString = new StringBuilder(50);
 @Weak
 private Kernel kernel;
 public Geo3DVec(Kernel kernel) {
  this.kernel = kernel;
 }
 public Geo3DVec(Kernel kernel, double x, double y, double z) {
  this(kernel);
  this.x = x;
  this.y = y;
  this.z = z;
 }
 public Geo3DVec(Geo3DVec v) {
  this(v.kernel);
  x = v.x;
  y = v.y;
  z = v.z;
  mode = v.mode;
 }
 public Geo3DVec deepCopy(Kernel kernel1) {
  return new Geo3DVec(this);
 }
 public void resolveVariables(EvalInfo info) {
 }
 public Geo3DVec(Kernel kernel, GeoPoint3D p, GeoPoint3D q) {
  this(kernel);
  x = q.getX() - p.getX();
  y = q.getY() - p.getY();
  z = q.getZ() - p.getZ();
 }
 public void setX(double x) {
  this.x = x;
 }
 public void setY(double y) {
  this.y = y;
 }
 public void setZ(double z) {
  this.z = z;
 }
 public void setCoords(double x, double y, double z) {
  this.x = x;
  this.y = y;
  this.z = z;
 }
 public void setCoords(double[] a) {
  x = a[0];
  y = a[1];
  z = a[2];
 }
 public void setCoords(GeoVec3D v) {
  x = v.x;
  y = v.y;
  z = v.z;
 }
 public double getX() {
  return x;
 }
 public double getY() {
  return y;
 }
 public double getZ() {
  return z;
 }
 public boolean isEqual(GeoVecInterface v) {
  return DoubleUtil.isEqual(x, v.getX())
    && DoubleUtil.isEqual(y, v.getY())
    && DoubleUtil.isEqual(z, v.getZ());
 }
 public double length() {
  return length(x, y, z);
 }
 private static double length(double a, double b, double c) {
  return Math.sqrt(a * a + b * b + c * c);
 }
 public void makeUnitVector() {
  double len = this.length();
  x = x / len;
  y = y / len;
 }
 public static void add(Geo3DVec a, Geo3DVec b, Geo3DVec c) {
  c.x = a.x + b.x;
  c.y = a.y + b.y;
  c.z = a.z + b.z;
 }
 public static void add(Geo3DVec a, GeoVec2D b, Geo3DVec c) {
  c.x = a.x + b.getX();
  c.y = a.y + b.getY();
  c.z = a.z;
 }
 public static void vectorProduct(GeoVecInterface a, GeoVecInterface b, Geo3DVec c) {
  double tempX = a.getY() * b.getZ() - a.getZ() * b.getY();
  double tempY = -a.getX() * b.getZ() + a.getZ() * b.getX();
  c.z = a.getX() * b.getY() - a.getY() * b.getX();
  c.x = tempX;
  c.y = tempY;
 }
 public static void sub(Geo3DVec a, Geo3DVec b, Geo3DVec c) {
  c.x = a.x - b.x;
  c.y = a.y - b.y;
  c.z = a.z - b.z;
 }
 public static void sub(Geo3DVec a, GeoVec2D b, Geo3DVec c) {
  c.x = a.x - b.getX();
  c.y = a.y - b.getY();
  c.z = a.z;
 }
 public static void sub(GeoVec2D a, Geo3DVec b, Geo3DVec c) {
  c.x = a.getX() - b.x;
  c.y = a.getY() - b.y;
  c.z = -b.z;
 }
 public static void mult(Geo3DVec a, double b, Geo3DVec c) {
  c.x = a.x * b;
  c.y = a.y * b;
  c.z = a.z * b;
 }
 public static void inner(GeoVecInterface a, GeoVecInterface b, MyDouble c) {
  c.set(a.getX() * b.getX() + a.getY() * b.getY() + a.getZ() * b.getZ());
 }
 public static void complexMultiply(GeoVecInterface a, GeoVecInterface b, GeoVec2D c) {
  if (!DoubleUtil.isZero(a.getZ()) || !DoubleUtil.isZero(b.getZ())) {
   c.setCoords(Double.NaN, Double.NaN);
   c.setMode(Kernel.COORD_COMPLEX);
   return;
  }
  Complex out = new Complex(a.getX(), a.getY());
  out = out.multiply(new Complex(b.getX(), b.getY()));
  c.setCoords(out.getReal(), out.getImaginary());
  c.setMode(Kernel.COORD_COMPLEX);
 }
 public static void div(Geo3DVec a, double b, Geo3DVec c) {
  c.x = a.x / b;
  c.y = a.y / b;
  c.z = a.z / b;
 }
 public String toString(StringTemplate tpl) {
  sbToString.setLength(0);
  sbToString.append('(');
  sbToString.append(kernel.format(x, tpl));
  sbToString.append(", ");
  sbToString.append(kernel.format(y, tpl));
  sbToString.append(", ");
  sbToString.append(kernel.format(z, tpl));
  sbToString.append(')');
  return sbToString.toString();
 }
 public Geo3DVec getVector() {
  return this;
 }
 public boolean isConstant() {
  return true;
 }
 public boolean isLeaf() {
  return true;
 }
 public void getVariables(Set<GeoElement> variables, SymbolicMode symbolicMode) {
 }
 public String toValueString(StringTemplate tpl) {
  return toString(tpl);
 }
 public String toLaTeXString(boolean symbolic, StringTemplate tpl) {
  return toString(tpl);
 }
 public boolean isNumberValue() {
  return false;
 }
 public boolean contains(ExpressionValue ev) {
  return ev == this;
 }
 public double[] getPointAsDouble() {
  return new double[] {getX(), getY(), getZ()};
 }
 public String toOutputValueString(StringTemplate tpl) {
  return toValueString(tpl);
 }
 public boolean isEqual(Geo3DVecInterface vec) {
  Geo3DVec v = (Geo3DVec) vec;
  return DoubleUtil.isEqual(x, v.x) && DoubleUtil.isEqual(y, v.y) && DoubleUtil.isEqual(z, v.z);
 }
 public void multiplyMatrix3x3(MyList list, VectorNDValue rt) {
  GeoVecInterface v = rt.getVector();
  final double xx = v.getX();
  final double yy = v.getY();
  final double zz = v.getZ();
  double a = MyList.getCellAsDouble(list, 0, 0);
  double b = MyList.getCellAsDouble(list, 1, 0);
  double c = MyList.getCellAsDouble(list, 2, 0);
  double d = MyList.getCellAsDouble(list, 0, 1);
  double e = MyList.getCellAsDouble(list, 1, 1);
  double f = MyList.getCellAsDouble(list, 2, 1);
  double g = MyList.getCellAsDouble(list, 0, 2);
  double h = MyList.getCellAsDouble(list, 1, 2);
  double i = MyList.getCellAsDouble(list, 2, 2);
  x = a * xx + b * yy + c * zz;
  y = d * xx + e * yy + f * zz;
  z = g * xx + h * yy + i * zz;
 }
 public void multiplyMatrix4x4(MyList list, VectorNDValue rt) {
  double m, n, o, p, xx, yy, zz, ww;
  boolean vector = false;
  if (rt instanceof GeoPointND point) { 
   Coords coords = point.getCoordsInD3();
   xx = coords.getX();
   yy = coords.getY();
   zz = coords.getZ();
   ww = coords.getW();
  } else {
   GeoVecInterface v = rt.getVector();
   xx = v.getX();
   yy = v.getY();
   zz = v.getZ();
   ww = 0;
   vector = true;
  }
  m = MyList.getCellAsDouble(list, 0, 3);
  n = MyList.getCellAsDouble(list, 1, 3);
  o = MyList.getCellAsDouble(list, 2, 3);
  p = MyList.getCellAsDouble(list, 3, 3);
  double w = m * xx + n * yy + o * zz + p * ww;
  if (vector && !DoubleUtil.isZero(w)) {
   x = Double.NaN;
   y = Double.NaN;
   z = Double.NaN;
   return;
  }
  double a = MyList.getCellAsDouble(list, 0, 0);
  double b = MyList.getCellAsDouble(list, 1, 0);
  double c = MyList.getCellAsDouble(list, 2, 0);
  double d = MyList.getCellAsDouble(list, 3, 0);
  double e = MyList.getCellAsDouble(list, 0, 1);
  double f = MyList.getCellAsDouble(list, 1, 1);
  double g = MyList.getCellAsDouble(list, 2, 1);
  double h = MyList.getCellAsDouble(list, 3, 1);
  double i = MyList.getCellAsDouble(list, 0, 2);
  double j = MyList.getCellAsDouble(list, 1, 2);
  double k = MyList.getCellAsDouble(list, 2, 2);
  double l = MyList.getCellAsDouble(list, 3, 2);
  x = a * xx + b * yy + c * zz + d * ww;
  y = e * xx + f * yy + g * zz + h * ww;
  z = i * xx + j * yy + k * zz + l * ww;
  if (!vector) {
   x = x / w;
   y = y / w;
   z = z / w;
  }
 }
 public void multiplyMatrix3x2(MyList list, VectorNDValue rt) {
  GeoVecInterface v = rt.getVector();
  final double xx = v.getX();
  final double yy = v.getY();
  double a = MyList.getCellAsDouble(list, 0, 0);
  double b = MyList.getCellAsDouble(list, 1, 0);
  double d = MyList.getCellAsDouble(list, 0, 1);
  double e = MyList.getCellAsDouble(list, 1, 1);
  double g = MyList.getCellAsDouble(list, 0, 2);
  double h = MyList.getCellAsDouble(list, 1, 2);
  x = a * xx + b * yy;
  y = d * xx + e * yy;
  z = g * xx + h * yy;
 }
 public static void multiplyMatrix(MyList list, VectorNDValue rt, GeoVec2D ret) {
  GeoVecInterface v = rt.getVector();
  final double xx = v.getX();
  final double yy = v.getY();
  final double zz = v.getZ();
  double a = MyList.getCellAsDouble(list, 0, 0);
  double b = MyList.getCellAsDouble(list, 1, 0);
  double c = MyList.getCellAsDouble(list, 2, 0);
  double d = MyList.getCellAsDouble(list, 0, 1);
  double e = MyList.getCellAsDouble(list, 1, 1);
  double f = MyList.getCellAsDouble(list, 2, 1);
  ret.setCoords(a * xx + b * yy + c * zz, d * xx + e * yy + f * zz);
 }
 public int getToStringMode() {
  return this.mode;
 }
 public Geo3DVec round() {
  return new Geo3DVec(kernel, Math.round(x), Math.round(y), Math.round(z));
 }
 public Geo3DVec floor() {
  return new Geo3DVec(kernel, Math.floor(x), Math.floor(y), Math.floor(z));
 }
 public Geo3DVec ceil() {
  return new Geo3DVec(kernel, Math.ceil(x), Math.ceil(y), Math.ceil(z));
 }
 public ExpressionNode wrap() {
  return new ExpressionNode(kernel, this);
 }
 public double arg() {
  return Math.atan2(y, x);
 }
 public ValueType getValueType() {
  return ValueType.VECTOR3D;
 }
 public int getDimension() {
  return 3;
 }
 public void mult(double d) {
  this.x *= d;
  this.y *= d;
  this.z *= d;
 }
 public void setMode(int mode) {
  this.mode = mode;
 }
 public ExpressionValue getUndefinedCopy(Kernel kernel1) {
  return kernel1.getManager3D().newGeo3DVec(Double.NaN, Double.NaN, Double.NaN);
 }
 public Kernel getKernel() {
  return kernel;
 }
 public Localization getLocalization() {
  return kernel.getLocalization();
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoAngle3D.java
```java
public final class GeoAngle3D extends GeoAngle {
 private boolean hasOrientation;
 public GeoAngle3D(Construction c) {
  super(c);
  hasOrientation = false;
 }
 public GeoAngle copy() {
  GeoAngle3D angle = new GeoAngle3D(cons);
  angle.hasOrientation = hasOrientation;
  copyPropertiesTo(angle);
  return angle;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.ANGLE3D;
 }
 public boolean hasOrientation() {
  return hasOrientation; 
 }
 public void setHasOrientation(boolean flag) {
  hasOrientation = flag;
 }
 public static GeoAngle3D newAngle3DWithDefaultInterval(Construction cons) {
  GeoAngle3D ret = new GeoAngle3D(cons);
  ret.setHasOrientation(true);
  ret.setDrawableNoSlider();
  ret.setAngleStyle(((GeoAngle)
      cons.getConstructionDefaults().getDefaultGeo(ConstructionDefaults.DEFAULT_ANGLE))
    .getAngleStyle());
  return ret;
 }
 public void setAngleStyle(AngleStyle angleStyle) {
  if (!hasOrientation()
    && (angleStyle == AngleStyle.ANTICLOCKWISE || angleStyle == AngleStyle.UNBOUNDED)) {
   super.setAngleStyle(AngleStyle.NOTREFLEX);
  } else {
   super.setAngleStyle(angleStyle);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoAxis3D.java
```java
public class GeoAxis3D extends GeoLine3D implements GeoAxisND {
 private int type;
 private int ticksize = 5; 
 private GColor coloredColorFor3D;
 public GeoAxis3D(Construction cons) {
  super(cons);
 }
 public int getType() {
  return type;
 }
 public GeoAxis3D(Construction c, int type) {
  this(c);
  this.type = type;
  switch (type) {
   default:
   case X_AXIS_3D:
    setCoord(Coords.O, Coords.VX);
    label = "xAxis3D";
    coloredColorFor3D = GColor.RED;
    break;
   case Y_AXIS_3D:
    setCoord(Coords.O, Coords.VY);
    label = "yAxis3D";
    coloredColorFor3D = GColor.DARK_GREEN;
    break;
   case Z_AXIS_3D:
    setCoord(Coords.O, Coords.VZ);
    label = "zAxis";
    coloredColorFor3D = GColor.BLUE;
    break;
  }
  setLabelSet(true);
  setFixed(true);
  setLabelVisible(false);
 }
 public boolean isAvailableAtConstructionStep(int step) {
  return true;
 }
 public boolean isDefined() {
  return true;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.AXIS3D;
 }
 public String toValueString(StringTemplate tpl) {
  return label;
 }
 public boolean isLabelSet() {
  return true;
 }
 public String getUnitLabel() {
  return "";
 }
 public int getTickStyle() {
  return 0;
 }
 public boolean getShowNumbers() {
  return true;
 }
 public int getTickSize() {
  return ticksize;
 }
 public Coords getDirectionInD3() {
  switch (type) {
   default:
   case X_AXIS_3D:
    return Coords.VX;
   case Y_AXIS_3D:
    return Coords.VY;
   case Z_AXIS_3D:
    return Coords.VZ;
  }
 }
 public boolean isAxis() {
  return true;
 }
 public String getLabel(StringTemplate tpl) {
  if (tpl.isPrintLocalizedCommandNames()) {
   return getLoc().getMenu(label);
  }
  return label;
 }
 public boolean isTraceable() {
  return false;
 }
 protected final void getCoordsXML(XMLStringBuilder sb) {
 }
 public boolean isRenameable() {
  return false;
 }
 public final boolean isSelectionAllowed(EuclidianViewInterfaceSlim ev) {
  EuclidianSettings settings = ev == null
    ? kernel.getApplication().getActiveEuclidianView().getSettings()
    : ev.getSettings();
  if (settings != null) {
   return settings.isSelectionAllowed(type);
  }
  return true;
 }
 public int getLineThickness() {
  return EuclidianStyleConstants.AXES_THICKNESS;
 }
 public boolean isProtected(EventType eventType) {
  return true;
 }
 public void setColoredFor3D(boolean colored) {
  if (colored) {
   setObjColor(coloredColorFor3D);
  } else {
   setObjColor(GColor.BLACK);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoClippingCube3D.java
```java
public class GeoClippingCube3D extends GeoElement3D {
 public static final int REDUCTION_SMALL = 0;
 public static final int REDUCTION_MEDIUM = 1;
 public static final int REDUCTION_LARGE = 2;
 public static final int REDUCTION_MIN = 0;
 public static final int REDUCTION_MAX = 2;
 private int reduction = REDUCTION_MEDIUM;
 public GeoClippingCube3D(Construction c) {
  super(c);
 }
 public Coords getLabelPosition() {
  return null;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.CLIPPINGCUBE3D;
 }
 public GeoElement copy() {
  return null;
 }
 public void set(GeoElementND geo) {
 }
 public boolean isDefined() {
  return true;
 }
 public void setUndefined() {
 }
 public String toValueString(StringTemplate tpl) {
  return null;
 }
 public boolean showInAlgebraView() {
  return false;
 }
 protected boolean showInEuclidianView() {
  return true;
 }
 public void setReduction(int value) {
  reduction = value;
 }
 public int getReduction() {
  return reduction;
 }
 public final HitType getLastHitType() {
  return HitType.NONE;
 }
 public ValueType getValueType() {
  return ValueType.VOID;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoConic3D.java
```java
public class GeoConic3D extends GeoConicND implements RotatableND, MirrorableAtPlane, ViewCreator {
 private CoordSys coordSys = new CoordSys(2);
 private Coords midpoint3D;
 private CoordMatrix4x4 tmpMatrix4x4;
 private EuclidianViewForPlaneCompanionInterface euclidianViewForPlane;
 public GeoConic3D(Construction c, CoordSys cs) {
  this(c);
  setCoordSys(cs);
 }
 public GeoConic3D(GeoConicND conic) {
  this(conic.getConstruction());
  set(conic);
 }
 public GeoConic3D(Construction c) {
  this(c, false);
 }
 public GeoConic3D(Construction c, boolean isIntersection) {
  super(c, 2, isIntersection, Form.PARAMETRIC);
 }
 protected void createFields(int dimension) {
  midpoint3D = Coords.createInhomCoorsInD3();
  super.createFields(dimension);
 }
 public void setCoordSys(CoordSys cs) {
  this.coordSys = cs;
 }
 public CoordSys getCoordSys() {
  return coordSys;
 }
 public Coords getMainDirection() {
  return coordSys.getNormal();
 }
 public Coords getEigenvec3D(int i) {
  return coordSys.getVector(super.getEigenvec(i));
 }
 public Coords getMidpointND() {
  return getMidpoint3D();
 }
 public Coords getMidpoint3D() {
  return coordSys.getPoint(super.getMidpoint2D(), midpoint3D);
 }
 public Coords getDirection3D(int i) {
  return getCoordSys().getVector(lines[i].y, -lines[i].x);
 }
 public Coords getOrigin3D(int i) {
  return getCoordSys().getPoint(startPoints[i].x, startPoints[i].y);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.CONIC3D;
 }
 public boolean isGeoElement3D() {
  return true;
 }
 public boolean hasFillType() {
  return false;
 }
 public String toString(StringTemplate tpl) {
  StringBuilder sbToString = new StringBuilder();
  switch (getType()) {
   case CONIC_CIRCLE:
   case CONIC_ELLIPSE:
   case CONIC_HYPERBOLA:
   case CONIC_PARABOLA:
    sbToString.setLength(0);
    sbToString.append(label);
    sbToString.append(": ");
    break;
   default:
    sbToString.setLength(0);
    sbToString.append(label);
    sbToString.append(": ");
    break;
  }
  sbToString.append(buildValueString(tpl));
  return sbToString.toString();
 }
 protected StringBuilder buildValueString(StringTemplate tpl) {
  return buildParametricValueString(tpl, 3);
 }
 public void setSphereND(GeoPointND M, GeoSegmentND segment) {
 }
 public void setSphereND(GeoPointND M, GeoPointND P) {
 }
 public void setSinglePoint(GeoPointND m) {
  setMidpoint(coordSys.getNormalProjection(m.getInhomCoordsInD3())[1].get());
  setSinglePointMatrix();
  singlePoint();
 }
 public void setSinglePointAtCoords(Coords coords) {
  coordSys.setSimpleCoordSysWithOrigin(coords);
  setMidpoint(0, 0);
  setSinglePointMatrix();
  singlePoint();
 }
 private void setSinglePointMatrix() {
  for (int i = 0; i < matrix.length; i++) {
   matrix[i] = 0;
  }
  for (int i = 0; i < 3; i++) {
   matrix[i] = 1.0d;
  }
 }
 public static void setSinglePoint(GeoConic3D conic, Coords m) {
  CoordSys cs = conic.getCoordSys();
  if (cs == null) {
   cs = new CoordSys(2);
   conic.setCoordSys(cs);
  }
  cs.resetCoordSys();
  cs.addPoint(m);
  cs.completeCoordSys2D();
  cs.makeOrthoMatrix(false, false);
  conic.setMidpoint(new double[] {0, 0});
  conic.setSinglePointMatrix();
  conic.singlePoint();
 }
 public GeoElement copy() {
  return new GeoConic3D(this);
 }
 public ExtendedBoolean isEqualExtended(GeoElementND Geo) {
  return ExtendedBoolean.FALSE;
 }
 public void set(GeoElementND geo) {
  if (geo instanceof GeoConicND) {
   super.set(geo);
   if (coordSys == null) {
    coordSys = new CoordSys(2);
   }
   coordSys.set(((GeoConicND) geo).getCoordSys());
   setIsEndOfQuadric(((GeoConicND) geo).isEndOfQuadric());
  }
 }
 protected void getXMLTags(XMLStringBuilder sb) {
  if (getCoordSys() != null && isIndependent()) {
   Coords v0 = getCoordSys().getV(0);
   Coords v1 = getCoordSys().getV(1);
   Coords origin = getCoordSys().getOrigin();
   sb.startTag("coords");
   sb.attr("ox", origin.getX());
   sb.attr("oy", origin.getY());
   sb.attr("oz", origin.getZ());
   sb.attr("ow", origin.getW());
   sb.attr("vx", v0.getX());
   sb.attr("vy", v0.getY());
   sb.attr("vz", v0.getZ());
   sb.attr("wx", v1.getX());
   sb.attr("wy", v1.getY());
   sb.attr("wz", v1.getZ());
   sb.endTag();
  }
  super.getXMLTags(sb);
 }
 public Coords getPoint(double x2d, double y2d, Coords coords) {
  return getCoordSys().getPoint(x2d, y2d, coords);
 }
 public Coords[] getNormalProjection(Coords coords) {
  return getCoordSys().getNormalProjection(coords);
 }
 public Coords[] getProjection(Coords coords, Coords willingDirection) {
  Coords[] result = new Coords[] {new Coords(4), new Coords(4)};
  coords.projectPlaneThruV(
    getCoordSys().getMatrixOrthonormal(), willingDirection, result[0], result[1]);
  return result;
 }
 public boolean isIntersection() {
  return isIntersection;
 }
 protected void doTranslate(Coords v) {
  coordSys.translate(v);
 }
 public void matrixTransform(double a00, double a01, double a10, double a11) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = CoordMatrix4x4.identity();
  } else {
   tmpMatrix4x4.set(1, 3, 0);
   tmpMatrix4x4.set(1, 4, 0);
   tmpMatrix4x4.set(2, 3, 0);
   tmpMatrix4x4.set(2, 4, 0);
   tmpMatrix4x4.set(3, 1, 0);
   tmpMatrix4x4.set(3, 2, 0);
   tmpMatrix4x4.set(3, 3, 0);
   tmpMatrix4x4.set(3, 4, 0);
   tmpMatrix4x4.set(4, 1, 0);
   tmpMatrix4x4.set(4, 2, 0);
   tmpMatrix4x4.set(4, 3, 0);
   tmpMatrix4x4.set(4, 4, 1);
  }
  tmpMatrix4x4.set(1, 1, a00);
  tmpMatrix4x4.set(1, 2, a01);
  tmpMatrix4x4.set(2, 1, a10);
  tmpMatrix4x4.set(2, 2, a11);
  double[] ret = getCoordSys().matrixTransform(tmpMatrix4x4);
  super.matrixTransform(ret[0], ret[1], 0, ret[2]);
 }
 public void matrixTransform(
   double a00,
   double a01,
   double a02,
   double a10,
   double a11,
   double a12,
   double a20,
   double a21,
   double a22) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = CoordMatrix4x4.identity();
  } else {
   tmpMatrix4x4.resetLastRowAndColumn();
  }
  tmpMatrix4x4.set(1, 1, a00);
  tmpMatrix4x4.set(1, 2, a01);
  tmpMatrix4x4.set(1, 3, a02);
  tmpMatrix4x4.set(2, 1, a10);
  tmpMatrix4x4.set(2, 2, a11);
  tmpMatrix4x4.set(2, 3, a12);
  tmpMatrix4x4.set(3, 1, a20);
  tmpMatrix4x4.set(3, 2, a21);
  tmpMatrix4x4.set(3, 3, a22);
  double[] ret = getCoordSys().matrixTransform(tmpMatrix4x4);
  super.matrixTransform(ret[0], ret[1], 0, ret[2]);
 }
 public final void rotate(NumberValue phiVal) {
  coordSys.rotate(phiVal.getDouble(), Coords.O);
 }
 public final void rotate(NumberValue phiVal, GeoPointND Q) {
  coordSys.rotate(phiVal.getDouble(), Q.getInhomCoordsInD3());
 }
 public void rotate(NumberValue phiVal, Coords Q, GeoDirectionND orientation) {
  rotate(phiVal, Q, orientation.getDirectionInD3());
 }
 private void rotate(NumberValue phiVal, Coords center, Coords direction) {
  coordSys.rotate(phiVal.getDouble(), center, direction.normalized());
 }
 public Coords getDirectionInD3() {
  switch (type) {
   case CONIC_LINE:
   case CONIC_EMPTY:
   case CONIC_SINGLE_POINT:
    return null;
   default:
    return getCoordSys().getVz();
  }
 }
 public void translate(Coords v) {
  getCoordSys().translate(v);
 }
 public void mirror(Coords Q) {
  getCoordSys().mirror(Q);
 }
 public void mirror(GeoLineND line) {
  Coords point = line.getStartInhomCoords();
  Coords direction = line.getDirectionInD3().normalized();
  getCoordSys().mirror(point, direction);
 }
 public void mirror(GeoCoordSys2D plane) {
  getCoordSys().mirror(plane.getCoordSys());
 }
 public void dilate(NumberValue rval, Coords S) {
  double r = rval.getDouble();
  getCoordSys().dilate(r, S);
  if (r < 0) { 
   r = -r;
  }
  dilate(r);
 }
 public int getViewID() {
  return euclidianViewForPlane.getId();
 }
 public void createView2D() {
  euclidianViewForPlane =
    kernel.getApplication().getCompanion().createEuclidianViewForPlane(this, true);
  euclidianViewForPlane.setTransformRegardingView();
 }
 public void removeView2D() {
  euclidianViewForPlane.doRemove();
 }
 public void doRemove() {
  if (euclidianViewForPlane != null) {
   removeView2D();
  }
  super.doRemove();
 }
 public boolean hasView2DVisible() {
  return euclidianViewForPlane != null
    && kernel.getApplication().getGuiManager().showView(euclidianViewForPlane.getId());
 }
 public void setView2DVisible(boolean flag) {
  if (euclidianViewForPlane == null) {
   if (flag) {
    createView2D();
   }
   return;
  }
  kernel.getApplication().getGuiManager().setShowView(flag, euclidianViewForPlane.getId());
 }
 public void update(boolean drag) {
  super.update(drag);
  if (euclidianViewForPlane != null) {
   euclidianViewForPlane.updateMatrix();
   updateViewForPlane();
  }
 }
 private void updateViewForPlane() {
  euclidianViewForPlane.updateAllDrawables(true);
 }
 public void setEuclidianViewForPlane(EuclidianViewForPlaneCompanionInterface view) {
  euclidianViewForPlane = view;
 }
 public boolean isParametric() {
  return true;
 }
 public ValueType getValueType() {
  return ValueType.PARAMETRIC3D;
 }
 public boolean isRegion3D() {
  return true;
 }
 public boolean isWhollyIn2DView(EuclidianView ev) {
  if (!DoubleUtil.isZero(getMidpoint3D().getInhomCoords().getZ())) {
   return false;
  }
  Coords normal = getMainDirection();
  return DoubleUtil.isZero(normal.getX()) && DoubleUtil.isZero(normal.getY());
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoConicPart3D.java
```java
public class GeoConicPart3D extends GeoConic3D
  implements GeoConicPartND, GeoNumberValue, LimitedPath {
 private GeoConicPartParameters parameters;
 private StringBuilder sbToString = new StringBuilder(50);
 private Coords tmpCoords = new Coords(3);
 private double[] tmpParameters = new double[2];
 private PathParameter tempPP;
 public GeoConicPart3D(Construction c, int type) {
  super(c);
  parameters = new GeoConicPartParameters(this, type);
  setConstructionDefaults();
 }
 public GeoConicPart3D(GeoConicPartND conic) {
  this(((GeoElement) conic).cons, conic.getConicPartType());
  set((GeoElement) conic);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.CONICPART;
 }
 public String getTypeString() {
  switch (parameters.conicPartType) {
   case CONIC_PART_ARC:
    return "Arc";
   case CONIC_PART_SECTOR:
    return "Sector";
   default:
    return super.getTypeString();
  }
 }
 public GeoElement copyInternal(Construction construction) {
  GeoConicPart3D ret = new GeoConicPart3D(construction, parameters.conicPartType);
  ret.set(this);
  return ret;
 }
 public void set(GeoElementND geo) {
  super.set(geo);
  if (!geo.isGeoConicPart()) {
   return;
  }
  GeoConicPartND cp = (GeoConicPartND) geo;
  parameters.set(cp.getParameters());
 }
 public void setBasicVisualStyle(GeoElement geo) {
  super.setBasicVisualStyle(geo);
  if (geo.isGeoConicPart()) {
   GeoConicPartND cp = (GeoConicPartND) geo;
   parameters.allowOutlyingIntersections = cp.getParameters().allowOutlyingIntersections;
  }
 }
 public GeoConicPartParameters getParameters() {
  return parameters;
 }
 public final int getConicPartType() {
  if (parameters == null) { 
   return GeoConicNDConstants.CONIC_PART_ARC;
  }
  return parameters.conicPartType;
 }
 public final double getParameterStart() {
  return parameters.paramStart;
 }
 public final double getParameterEnd() {
  return parameters.paramEnd;
 }
 public final double getParameterExtent() {
  return parameters.paramExtent;
 }
 public final boolean positiveOrientation() {
  return parameters.posOrientation;
 }
 public final ExtendedBoolean isEqualExtended(GeoElementND geo) {
  if (!geo.isGeoConicPart()) {
   return ExtendedBoolean.FALSE;
  }
  GeoConicPart3D other = (GeoConicPart3D) geo;
  return parameters.isEqual(other.parameters)
    ? super.isEqualExtended(other)
    : ExtendedBoolean.FALSE;
 }
 public final void setParameters(double start, double end, boolean positiveOrientation) {
  parameters.setParameters(super.isDefined(), start, end, positiveOrientation);
 }
 public void setParametersToSinglePoint() {
  parameters.value = 0;
  parameters.setValueDefined(true);
 }
 public final boolean isDefined() {
  return parameters.isValueDefined();
 }
 public void setUndefined() {
  parameters.setValueDefined(false);
 }
 public final double getValue() {
  return parameters.getValue();
 }
 public final double getArcLength() {
  return parameters.getArcLength();
 }
 public final double getArea() {
  return parameters.getArea();
 }
 public final String toString(StringTemplate tpl) {
  sbToString.setLength(0);
  sbToString.append(label);
  sbToString.append(" = ");
  sbToString.append(toValueString(tpl));
  return sbToString.toString();
 }
 public final String toValueString(StringTemplate tpl) {
  if (parameters.isValueDefined()) {
   return kernel.format(parameters.value, tpl);
  }
  return kernel.format(Double.NaN, tpl);
 }
 public boolean allowOutlyingIntersections() {
  return parameters.allowOutlyingIntersections;
 }
 public void setAllowOutlyingIntersections(boolean flag) {
  parameters.allowOutlyingIntersections = flag;
 }
 public boolean keepsTypeOnGeometricTransform() {
  return parameters.keepTypeOnGeometricTransform;
 }
 public void setKeepTypeOnGeometricTransform(boolean flag) {
  parameters.keepTypeOnGeometricTransform = flag;
 }
 public boolean isIntersectionPointIncident(GeoPoint pt, double eps) {
  if (parameters.allowOutlyingIntersections) {
   return isOnFullConic(pt, eps);
  }
  return isOnPath(pt, eps);
 }
 public boolean isOnPath(GeoPointND PI, double precision) {
  double eps = precision;
  GeoPoint P = (GeoPoint) PI;
  if (P.getPath() == this) {
   return true;
  }
  if (!isOnFullConic(P, eps)) {
   return false;
  }
  final double px = P.x;
  final double py = P.y;
  final double pz = P.z;
  PathParameter tempParam = getTempPathParameter();
  PathParameter pPP = P.getPathParameter();
  tempParam.set(pPP);
  switch (type) {
   case CONIC_CIRCLE:
   case CONIC_ELLIPSE:
    parameters.setEllipseParameter(P.getCoordsInD2(getCoordSys()), P.getPathParameter());
    break;
   case CONIC_PARALLEL_LINES:
    if (parameters.posOrientation) {
     lines[0].pointChanged(P);
    } else {
     P.getPathParameter().t = -1;
    }
    break;
   default:
    pPP.t = -1;
  }
  if (halfAxes[0] > 100) {
   eps = Math.max(Kernel.MAX_PRECISION, eps / halfAxes[0]);
  }
  boolean result = pPP.t >= -eps && pPP.t <= 1 + eps;
  P.x = px;
  P.y = py;
  P.z = pz;
  pPP.set(tempParam);
  return result;
 }
 private PathParameter getTempPathParameter() {
  if (tempPP == null) {
   tempPP = new PathParameter();
  }
  return tempPP;
 }
 public boolean isClosedPath() {
  return false;
 }
 public void pointChanged(Coords P, PathParameter pp) {
  pp.setPathType(type);
  switch (type) {
   case CONIC_CIRCLE:
   case CONIC_ELLIPSE:
    parameters.setEllipseParameter(P, pp);
    parameters.clipEllipseParameter(P, pp);
    break;
   case CONIC_PARALLEL_LINES:
    if (parameters.posOrientation) {
     lines[0].doPointChanged(P, pp);
     if (pp.t < 0) {
      pp.t = 0;
      pathChanged(P, pp);
     } else if (pp.t > 1) {
      pp.t = 1;
      pathChanged(P, pp);
     }
    } else {
     P.setX(-lines[0].y);
     P.setY(lines[0].x);
     P.setZ(0);
    }
    break;
   default:
    pp.t = Double.NaN;
  }
 }
 protected void pathChanged(Coords P, PathParameter pp) {
  if (!parameters.isValueDefined()) {
   P.setX(Double.NaN);
   return;
  }
  if (pp.getPathType() != type || Double.isNaN(pp.t)) {
   pointChanged(P, pp);
   return;
  }
  if (pp.t < 0.0) {
   pp.t = 0;
  } else if (pp.t > 1.0) {
   pp.t = 1;
  }
  switch (type) {
   case CONIC_CIRCLE:
   case CONIC_ELLIPSE:
    if (pp.getPathType() != type) {
     pointChanged(P, pp);
     return;
    }
    double t = parameters.posOrientation ? pp.t : 1.0 - pp.t;
    double angle = parameters.paramStart + t * parameters.paramExtent;
    P.setX(halfAxes[0] * Math.cos(angle));
    P.setY(halfAxes[1] * Math.sin(angle));
    P.setZ(1);
    coordsEVtoRW(P);
    break;
   case CONIC_PARALLEL_LINES:
    if (parameters.posOrientation) { 
     if (pp.getPathType() != type) {
      pointChanged(P, pp);
     } else {
      lines[0].pathChanged(P, pp);
     }
    } else {
     P.setX(-lines[0].y);
     P.setY(lines[0].x);
     P.setZ(0);
    }
    break;
   default:
  }
 }
 public double getMinParameter() {
  switch (type) {
   case CONIC_CIRCLE:
   case CONIC_ELLIPSE:
    return 0;
   case CONIC_PARALLEL_LINES:
    if (parameters.posOrientation) {
     return 0;
    }
    return Double.NEGATIVE_INFINITY;
   default:
    return Double.NaN;
  }
 }
 public double getMaxParameter() {
  switch (type) {
   case CONIC_CIRCLE:
   case CONIC_ELLIPSE:
    return 1;
   case CONIC_PARALLEL_LINES:
    if (parameters.posOrientation) {
     return 1;
    }
    return Double.POSITIVE_INFINITY;
   default:
    return Double.NaN;
  }
 }
 public PathMover createPathMover() {
  return new PathMoverGeneric(this);
 }
 protected void getStyleXML(XMLStringBuilder sb) {
  super.getStyleXML(sb);
  parameters.getLimitedPathXML(sb);
 }
 public MyDouble getNumber() {
  return new MyDouble(kernel, getValue());
 }
 public final double getDouble() {
  return getValue();
 }
 public boolean isNumberValue() {
  return true;
 }
 public boolean isGeoConicPart() {
  return true;
 }
 public final GeoElement copy() {
  return new GeoConicPart3D(this);
 }
 public boolean isInRegion(double x0, double y0) {
  if (!super.isInRegion(x0, y0)) {
   return false;
  }
  return parameters.isInRegion(x0, y0);
 }
 protected void moveBackToRegion(GeoPointND pi, RegionParameters rp) {
  Coords coords = pi.getCoordsInD2(getCoordSys());
  final PathParameter pp = pi.getPathParameter();
  CoordNearest nearestPoint = new CoordNearest(coords);
  Coords midPoint = getMidpoint2D();
  if (getConicPartType() == CONIC_PART_SECTOR) {
   nearestPoint.check(midPoint);
  }
  Coords ev0 = new Coords(3);
  ev0.set(getEigenvec(0));
  Coords ev1 = new Coords(3);
  ev1.set(getEigenvec(1));
  Coords firstPoint = midPoint
    .copy()
    .addInsideMul(ev0, getHalfAxis(0) * Math.cos(parameters.paramStart))
    .addInsideMul(ev1, getHalfAxis(1) * Math.sin(parameters.paramStart));
  nearestPoint.check(firstPoint);
  Coords secondPoint = midPoint
    .copy()
    .addInsideMul(ev0, getHalfAxis(0) * Math.cos(parameters.paramEnd))
    .addInsideMul(ev1, getHalfAxis(1) * Math.sin(parameters.paramEnd));
  nearestPoint.check(secondPoint);
  if (getConicPartType() == CONIC_PART_SECTOR) {
   coords.projectLineSub(midPoint, firstPoint, tmpCoords, tmpParameters);
   if (tmpParameters[0] > 0 && tmpParameters[0] < 1) {
    nearestPoint.check(tmpCoords);
   }
   coords.projectLineSub(midPoint, secondPoint, tmpCoords, tmpParameters);
   if (tmpParameters[0] > 0 && tmpParameters[0] < 1) {
    nearestPoint.check(tmpCoords);
   }
  } else {
   coords.projectLineSub(firstPoint, secondPoint, tmpCoords, tmpParameters);
   if (tmpParameters[0] > 0 && tmpParameters[0] < 1) {
    nearestPoint.check(tmpCoords);
   }
  }
  if (!super.isInRegion(coords.getX(), coords.getY())) {
   Coords pointConic = coords.copyVector();
   pointChanged(pointConic, pp);
   nearestPoint.check(pointConic);
   rp.setIsOnPath(true);
  }
  coords = nearestPoint.get();
  pi.setCoords2D(coords.getX(), coords.getY(), 1);
  pi.updateCoordsFrom2D(false, getCoordSys());
  pi.updateCoords();
 }
 public void regionChanged(GeoPointND PI) {
  if (!getKernel().usePathAndRegionParameters(PI) || PI.getRegionParameters().isNaN()) {
   pointChangedForRegion(PI);
   return;
  }
  super.regionChanged(PI);
  PI.updateCoords2D();
  if (!isInRegion(PI)) {
   pointChanged(PI);
  }
 }
 public boolean hasDrawable3D() {
  return true;
 }
 public boolean isAllEndpointsLabelsSet() {
  AlgoElement algo = this.getParentAlgorithm();
  if (algo == null) {
   return false;
  }
  if (algo instanceof AlgoConicPartConicPoints) {
   return ((AlgoConicPartConicPoints) algo).getStartPoint().isLabelSet()
     && ((AlgoConicPartConicPoints) algo).getEndPoint().isLabelSet();
  }
  if (algo instanceof AlgoConicPartCircumcircle) {
   return algo.getInput()[0].isLabelSet()
     && algo.getInput()[1].isLabelSet()
     && algo.getInput()[2].isLabelSet();
  }
  return false;
 }
 public GeoPoint getPointParam(double param) {
  GeoPoint ret = new GeoPoint(cons);
  this.pathChanged(ret);
  ret.getPathParameter().setT(param);
  this.pathChanged(ret);
  ret.updateCoords();
  return ret;
 }
 public Coords getOrigin3D(int i) {
  return getCoordSys().getPoint(lines[i].startPoint.inhomX, lines[i].startPoint.inhomY);
 }
 public Coords getSegmentEnd3D() {
  return getCoordSys().getPoint(lines[0].endPoint.inhomX, lines[0].endPoint.inhomY);
 }
 public GeoElement[] createTransformedObject(Transform t, String transformedLabel) {
  return new GeoElement[] {t.getTransformedConic(this)};
 }
 public boolean isInverseFillable() {
  return false;
 }
 public void toGeoCurveCartesian(GeoCurveCartesianND curve) {
  super.toGeoCurveCartesian(curve);
  parameters.updateCurve(curve);
 }
 public void dilate(NumberValue rval, Coords S) {
  super.dilate(rval, S);
  parameters.setValueDefined(super.isDefined());
  parameters.update();
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoConicSection.java
```java
public class GeoConicSection extends GeoConic3D implements GeoConicSectionInterface {
 private double[] paramStart;
 private double[] paramEnd;
 private double[] paramExtent;
 private double[] edgeStartX;
 private double[] edgeStartY;
 private double[] edgeEndX;
 private double[] edgeEndY;
 private double[] edgeStartParam;
 private double[] edgeEndParam;
 private boolean[] edgeExists;
 private TreeSet<IndexedParameter> parametersTree = new TreeSet<>();
 private IndexedParameter[] parametersArray = new IndexedParameter[4];
 public GeoConicSection(Construction c, boolean isIntersection) {
  super(c, isIntersection);
  paramStart = new double[2];
  paramEnd = new double[2];
  paramExtent = new double[2];
  edgeStartX = new double[2];
  edgeStartY = new double[2];
  edgeEndX = new double[2];
  edgeEndY = new double[2];
  edgeStartParam = new double[2];
  edgeEndParam = new double[2];
  edgeExists = new boolean[2];
 }
 private static final class IndexedParameter implements Comparable<IndexedParameter> {
  private final double value;
  private final int index;
  private IndexedParameter(double value, int index) {
   this.value = value;
   this.index = index;
  }
  public int compareTo(IndexedParameter parameter) {
   if (Double.isNaN(value)) {
    return 1;
   }
   if (Double.isNaN(parameter.value)) {
    return -1;
   }
   if (DoubleUtil.isGreater(parameter.value, value)) {
    return -1;
   }
   if (DoubleUtil.isGreater(value, parameter.value)) {
    return 1;
   }
   if (index < parameter.index) {
    return -1;
   }
   return 1; 
  }
  public boolean equals(Object o) {
   if (o instanceof IndexedParameter) {
    return compareTo((IndexedParameter) o) == 0;
   }
   return false;
  }
  public int hashCode() {
   return index + 43 * DoubleUtil.hashCode(value);
  }
 }
 public final void setParameters(double bottom0, double bottom1, double top0, double top1) {
  for (int i = 0; i < 2; i++) {
   edgeExists[i] = false;
  }
  GeoVec2D b = getB();
  switch (type) {
   default:
    break;
   case GeoConicNDConstants.CONIC_CIRCLE:
   case GeoConicNDConstants.CONIC_ELLIPSE:
    parametersTree.clear();
    parametersTree.add(new IndexedParameter(bottom0, 1));
    parametersTree.add(new IndexedParameter(bottom1, 1));
    parametersTree.add(new IndexedParameter(top0, 2));
    parametersTree.add(new IndexedParameter(top1, 2));
    parametersTree.toArray(parametersArray);
    double start1, end1, start2, end2;
    if (parametersArray[0].index == parametersArray[1].index) {
     start1 = parametersArray[0].value;
     end1 = parametersArray[1].value;
     start2 = parametersArray[2].value;
     end2 = parametersArray[3].value;
    } else {
     start1 = parametersArray[1].value;
     end1 = parametersArray[2].value;
     start2 = parametersArray[3].value;
     end2 = parametersArray[0].value;
    }
    if (start2 == end2) {
     start2 = start1;
     end2 = Double.NaN;
     start1 = Double.NaN;
    } else if (start1 == end1) {
     end1 = end2;
     end2 = Double.NaN;
     start1 = Double.NaN;
    }
    paramStart[0] = DoubleUtil.convertToAngleValue(end1);
    paramEnd[0] = DoubleUtil.convertToAngleValue(start2);
    paramExtent[0] = paramEnd[0] - paramStart[0];
    if (paramExtent[0] < 0) {
     paramExtent[0] += Kernel.PI_2;
    }
    paramStart[1] = DoubleUtil.convertToAngleValue(end2);
    paramEnd[1] = DoubleUtil.convertToAngleValue(start1);
    paramExtent[1] = paramEnd[1] - paramStart[1];
    if (paramExtent[1] < 0) {
     paramExtent[1] += Kernel.PI_2;
    }
    if (!Double.isNaN(paramStart[0])) { 
     double x0 = getEigenvec(0).getX() * getHalfAxis(0);
     double y0 = getEigenvec(0).getY() * getHalfAxis(0);
     double x1 = getEigenvec(1).getX() * getHalfAxis(1);
     double y1 = getEigenvec(1).getY() * getHalfAxis(1);
     if (Double.isNaN(paramStart[1])) { 
      edgeEndX[0] = b.getX() + x0 * Math.cos(paramStart[0]) + x1 * Math.sin(paramStart[0]);
      edgeEndY[0] = b.getY() + y0 * Math.cos(paramStart[0]) + y1 * Math.sin(paramStart[0]);
      edgeEndParam[0] = paramStart[0];
      edgeStartX[0] = b.getX() + x0 * Math.cos(paramEnd[0]) + x1 * Math.sin(paramEnd[0]);
      edgeStartY[0] = b.getY() + y0 * Math.cos(paramEnd[0]) + y1 * Math.sin(paramEnd[0]);
      edgeStartParam[0] = paramEnd[0];
      if (edgeStartParam[0] > edgeEndParam[0]) {
       edgeStartParam[0] -= 2 * Math.PI;
      }
      edgeExists[0] = true;
     } else {
      edgeEndX[0] = b.getX() + x0 * Math.cos(paramStart[0]) + x1 * Math.sin(paramStart[0]);
      edgeEndY[0] = b.getY() + y0 * Math.cos(paramStart[0]) + y1 * Math.sin(paramStart[0]);
      edgeEndParam[0] = paramStart[0];
      edgeStartX[0] = b.getX() + x0 * Math.cos(paramEnd[1]) + x1 * Math.sin(paramEnd[1]);
      edgeStartY[0] = b.getY() + y0 * Math.cos(paramEnd[1]) + y1 * Math.sin(paramEnd[1]);
      edgeStartParam[0] = paramEnd[1];
      if (edgeStartParam[0] > edgeEndParam[0]) {
       edgeStartParam[0] -= 2 * Math.PI;
      }
      edgeExists[0] = true;
      edgeEndX[1] = b.getX() + x0 * Math.cos(paramStart[1]) + x1 * Math.sin(paramStart[1]);
      edgeEndY[1] = b.getY() + y0 * Math.cos(paramStart[1]) + y1 * Math.sin(paramStart[1]);
      edgeEndParam[1] = paramStart[1];
      edgeStartX[1] = b.getX() + x0 * Math.cos(paramEnd[0]) + x1 * Math.sin(paramEnd[0]);
      edgeStartY[1] = b.getY() + y0 * Math.cos(paramEnd[0]) + y1 * Math.sin(paramEnd[0]);
      edgeStartParam[1] = paramEnd[0];
      if (edgeStartParam[1] > edgeEndParam[1]) {
       edgeStartParam[1] -= 2 * Math.PI;
      }
      edgeExists[1] = true;
     }
    }
    break;
   case CONIC_INTERSECTING_LINES:
   case CONIC_PARALLEL_LINES:
    if (bottom0 < bottom1) {
     start1 = bottom0;
     start2 = bottom1;
    } else {
     start1 = bottom1;
     start2 = bottom0;
    }
    if (top0 < top1) {
     end1 = top0;
     end2 = top1;
    } else {
     end1 = top1;
     end2 = top0;
    }
    paramStart[0] = PathNormalizer.infFunction(start1);
    paramEnd[0] = PathNormalizer.infFunction(end1);
    paramStart[1] = PathNormalizer.infFunction(start2 - 2);
    paramEnd[1] = PathNormalizer.infFunction(end2 - 2);
    break;
   case CONIC_DOUBLE_LINE:
    paramStart[0] = bottom0;
    paramEnd[0] = top0;
    break;
   case CONIC_HYPERBOLA:
    paramStart[0] = Double.NaN;
    paramEnd[0] = Double.NaN;
    paramStart[1] = Double.NaN;
    paramEnd[1] = Double.NaN;
    setInfParameter(paramStart, bottom0);
    setInfParameter(paramStart, top0);
    setInfParameter(paramEnd, bottom1);
    setInfParameter(paramEnd, top1);
    sortParameters();
    for (int i = 0; i < 2; i++) {
     if (!Double.isNaN(paramStart[i])) {
      double s = paramEnd[i];
      double x = (1 - 2 * i) * halfAxes[0] * MyMath.cosh(s);
      double y = halfAxes[1] * MyMath.sinh(s);
      double x1 =
        b.getX() + x * getEigenvec(0).getX() + y * getEigenvec(1).getX();
      double y1 =
        b.getY() + x * getEigenvec(0).getY() + y * getEigenvec(1).getY();
      s = paramStart[i];
      x = (1 - 2 * i) * halfAxes[0] * MyMath.cosh(s);
      y = halfAxes[1] * MyMath.sinh(s);
      double x2 =
        b.getX() + x * getEigenvec(0).getX() + y * getEigenvec(1).getX();
      double y2 =
        b.getY() + x * getEigenvec(0).getY() + y * getEigenvec(1).getY();
      if (i == 0) {
       edgeStartX[i] = x2;
       edgeStartY[i] = y2;
       edgeStartParam[i] = PathNormalizer.inverseInfFunction(paramStart[i]);
       edgeEndX[i] = x1;
       edgeEndY[i] = y1;
       edgeEndParam[i] = PathNormalizer.inverseInfFunction(paramEnd[i]);
      } else {
       edgeStartX[i] = x1;
       edgeStartY[i] = y1;
       edgeStartParam[i] = PathNormalizer.inverseInfFunction(paramEnd[i]) + 2;
       edgeEndX[i] = x2;
       edgeEndY[i] = y2;
       edgeEndParam[i] = PathNormalizer.inverseInfFunction(paramStart[i]) + 2;
      }
      edgeExists[i] = true;
     } else { 
      double x1 = b.getX() - getEigenvec(1).getX();
      double y1 = b.getY() - getEigenvec(1).getY();
      double x2 = b.getX() + getEigenvec(1).getX();
      double y2 = b.getY() + getEigenvec(1).getY();
      if (i == 0) {
       edgeStartX[i] = x1;
       edgeStartY[i] = y1;
       edgeEndX[i] = x2;
       edgeEndY[i] = y2;
      } else {
       edgeStartX[i] = x2;
       edgeStartY[i] = y2;
       edgeEndX[i] = x1;
       edgeEndY[i] = y1;
      }
     }
    }
    break;
   case CONIC_PARABOLA:
    if (bottom0 < bottom1) {
     paramStart[0] = bottom0;
     paramEnd[0] = bottom1;
    } else {
     paramStart[0] = bottom1;
     paramEnd[0] = bottom0;
    }
    double y = bottom0 * p;
    double x = y * bottom0 / 2.0;
    edgeEndX[0] = b.getX() + x * getEigenvec(0).getX() + y * getEigenvec(1).getX();
    edgeEndY[0] = b.getY() + x * getEigenvec(0).getY() + y * getEigenvec(1).getY();
    edgeEndParam[0] = bottom0;
    y = bottom1 * p;
    x = y * bottom1 / 2.0;
    edgeStartX[0] =
      b.getX() + x * getEigenvec(0).getX() + y * getEigenvec(1).getX();
    edgeStartY[0] =
      b.getY() + x * getEigenvec(0).getY() + y * getEigenvec(1).getY();
    edgeStartParam[0] = bottom1;
    edgeExists[0] = true;
    break;
  }
 }
 private void sortParameters() {
  for (int i = 0; i < 2; i++) {
   if (DoubleUtil.isZero(paramStart[i])) {
    paramStart[i] = 0;
   }
   if (DoubleUtil.isZero(paramEnd[i])) {
    paramEnd[i] = 0;
   }
   if (paramStart[i] > paramEnd[i]) {
    double tmp = paramStart[i];
    paramStart[i] = paramEnd[i];
    paramEnd[i] = tmp;
   }
  }
 }
 private static void setInfParameter(double[] param, double value) {
  if (Double.isNaN(value)) {
   return;
  }
  if (value < 1) {
   param[0] = PathNormalizer.infFunction(value);
  } else {
   param[1] = PathNormalizer.infFunction(value - 2);
  }
 }
 public final double getParameterStart(int index) {
  return paramStart[index];
 }
 public final double getParameterEnd(int index) {
  return paramEnd[index];
 }
 public final double getParameterExtent(int index) {
  return paramExtent[index];
 }
 public GeoClass getGeoClassType() {
  return GeoClass.CONICSECTION;
 }
 public boolean isInRegion(double x0, double y0) {
  if (!super.isInRegion(x0, y0)) {
   return false;
  }
  return isInsideEdges(x0, y0);
 }
 private boolean isInsideEdges(double x0, double y0) {
  for (int i = 0; i < 2; i++) {
   if (edgeExists[i] || type == GeoConicNDConstants.CONIC_HYPERBOLA) {
    if ((edgeStartX[i] - x0) * (edgeEndY[i] - y0) - (edgeEndX[i] - x0) * (edgeStartY[i] - y0)
      < 0) {
     return false;
    }
   }
  }
  return true;
 }
 @SuppressWarnings("PMD.AvoidDeeplyNestedIfStmts")
 public void pointChanged(Coords pt, PathParameter pp, boolean checkSection) {
  super.pointChanged(pt, pp, checkSection);
  if (checkSection) {
   double xOld = pt.getX() / pt.getZ();
   double yOld = pt.getY() / pt.getZ();
   double distance = Double.POSITIVE_INFINITY;
   if (type == GeoConicNDConstants.CONIC_HYPERBOLA) {
    if (edgeExists[0]) {
     if (pp.t > 1) { 
      pp.t = 0;
      pt.setX(getHalfAxis(0));
      pt.setY(0);
      pt.setZ(1.0);
      coordsEVtoRW(pt);
     }
    } else {
     if (pp.t < 1) { 
      pp.t = 2;
      pt.setX(-getHalfAxis(0));
      pt.setY(0);
      pt.setZ(1.0);
      coordsEVtoRW(pt);
     }
    }
   }
   pt.setInhomCoords();
   if (isInsideEdges(pt.getX(), pt.getY())) {
    double dx = pt.getX() - xOld;
    double dy = pt.getY() - yOld;
    distance = dx * dx + dy * dy;
   }
   for (int i = 0; i < 2; i++) {
    if (edgeExists[i]) {
     double parameter = getParameterOnSegment(
       xOld, yOld, edgeStartX[i], edgeStartY[i], edgeEndX[i], edgeEndY[i]);
     double x = edgeStartX[i] * (1 - parameter) + edgeEndX[i] * parameter;
     double y = edgeStartY[i] * (1 - parameter) + edgeEndY[i] * parameter;
     double dx = x - xOld;
     double dy = y - yOld;
     double d = dx * dx + dy * dy;
     if (d < distance) {
      distance = d;
      pt.setX(x);
      pt.setY(y);
      pt.setZ(1);
      switch (type) {
       default:
        pp.t = Double.NaN;
        break;
       case GeoConicNDConstants.CONIC_CIRCLE:
       case GeoConicNDConstants.CONIC_ELLIPSE:
        pp.t = edgeStartParam[i] * (1 - parameter) + edgeEndParam[i] * parameter;
        if (pp.t > Math.PI) {
         pp.t -= Kernel.PI_2;
        }
        break;
       case GeoConicNDConstants.CONIC_PARABOLA:
        if (edgeStartParam[0] < edgeEndParam[0]) {
         parameter = -parameter;
        }
        pp.t = edgeStartParam[0] + parameter;
        break;
       case GeoConicNDConstants.CONIC_HYPERBOLA:
        pp.t = edgeEndParam[i] * parameter + (1 - parameter);
        break;
      }
     }
    }
   }
  }
 }
 private static double getParameterOnSegment(
   double x, double y, double startX, double startY, double endX, double endY) {
  double dx = endX - startX;
  double dy = endY - startY;
  double parameter =
    ((x - startX) * (endX - startX) + (y - startY) * (endY - startY)) / (dx * dx + dy * dy);
  if (parameter < 0) {
   return 0;
  }
  if (parameter > 1) {
   return 1;
  }
  return parameter;
 }
 protected void pathChangedWithoutCheckEllipse(Coords P, PathParameter pp, boolean checkSection) {
  if (checkSection) {
   for (int i = 0; i < 2; i++) {
    if (edgeExists[i]) {
     if (checkPathChangeEllipseEdge(P, pp, i)) {
      return;
     }
    }
   }
  }
  super.pathChangedWithoutCheckEllipse(P, pp, checkSection);
 }
 private boolean checkPathChangeEllipseEdge(Coords P, PathParameter pp, int i) {
  double parameter = pp.t % Kernel.PI_2;
  if (parameter > Math.PI) {
   parameter -= Kernel.PI_2;
  }
  boolean inEdge;
  if (edgeStartParam[i] > Math.PI) {
   parameter += Kernel.PI_2;
   inEdge = parameter >= edgeStartParam[i] && parameter <= edgeEndParam[i];
  } else if (edgeEndParam[i] > Math.PI) {
   if (parameter >= edgeStartParam[i]) {
    inEdge = true;
   } else {
    parameter += Kernel.PI_2;
    inEdge = parameter <= edgeEndParam[i];
   }
  } else {
   inEdge = parameter >= edgeStartParam[i] && parameter <= edgeEndParam[i];
  }
  if (inEdge) {
   double a = (parameter - edgeStartParam[i]) / (edgeEndParam[i] - edgeStartParam[i]);
   P.setX(edgeStartX[i] * (1 - a) + edgeEndX[i] * a);
   P.setY(edgeStartY[i] * (1 - a) + edgeEndY[i] * a);
   P.setZ(1);
   return true;
  }
  return false;
 }
 protected void pathChangedWithoutCheckParabola(Coords P, PathParameter pp, boolean checkSection) {
  if (checkSection && edgeExists[0]) {
   if (edgeStartParam[0] < edgeEndParam[0]) {
    if (pp.t < edgeStartParam[0]) {
     double a = -pp.t + edgeStartParam[0];
     setFromParam(P, a);
     return;
    } else if (pp.t > edgeEndParam[0]) {
     P.setX(edgeEndX[0]);
     P.setY(edgeEndY[0]);
     P.setZ(1);
     return;
    }
   } else {
    if (pp.t > edgeStartParam[0]) {
     double a = pp.t - edgeStartParam[0];
     setFromParam(P, a);
     return;
    } else if (pp.t < edgeEndParam[0]) {
     P.setX(edgeEndX[0]);
     P.setY(edgeEndY[0]);
     P.setZ(1);
     return;
    }
   }
  }
  super.pathChangedWithoutCheckParabola(P, pp, checkSection);
 }
 private void setFromParam(Coords P, double a) {
  if (a < 1) {
   P.setX(edgeStartX[0] * (1 - a) + edgeEndX[0] * a);
   P.setY(edgeStartY[0] * (1 - a) + edgeEndY[0] * a);
  } else { 
   P.setX(edgeEndX[0]);
   P.setY(edgeEndY[0]);
  }
  P.setZ(1);
 }
 protected void pathChangedWithoutCheckHyperbola(
   Coords P, PathParameter pp, boolean checkSection) {
  double oldParameter = pp.t;
  if (checkSection) {
   int i;
   if (pp.t < 1) {
    if (edgeExists[0]) {
     i = 0;
    } else {
     i = 1;
     pp.t = 2 - pp.t;
    }
   } else {
    if (edgeExists[1]) {
     i = 1;
    } else {
     i = 0;
     pp.t = 2 - pp.t;
    }
   }
   if (i == 0 ^ pp.t < edgeEndParam[i]) {
    double a = (pp.t - edgeEndParam[i]) / (1 - edgeEndParam[i]); 
    if (a < 1) {
     P.setX(edgeStartX[i] * a + edgeEndX[i] * (1 - a));
     P.setY(edgeStartY[i] * a + edgeEndY[i] * (1 - a));
    } else { 
     P.setX(edgeEndX[i]);
     P.setY(edgeEndY[i]);
    }
    P.setZ(1);
    return;
   }
  }
  super.pathChangedWithoutCheckHyperbola(P, pp, checkSection);
  if (checkSection) {
   pp.t = oldParameter;
  }
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoCoordSys1D.java
```java
public abstract class GeoCoordSys1D extends GeoElement3D
  implements Path,
    GeoLineND,
    GeoCoordSys,
    GeoCoordSys1DInterface,
    Translateable,
    MatrixTransformable,
    Traceable,
    RotatableND,
    MirrorableAtPlane,
    Transformable,
    Dilateable {
 protected CoordSys coordsys;
 protected GeoPointND startPoint;
 protected GeoPointND endPoint;
 private boolean isIntersection;
 protected ArrayList<GeoPointND> pointsOnLine;
 private CoordMatrix4x4 tmpMatrix4x4;
 private Coords tmpCoords1;
 private Coords tmpCoords2;
 private boolean trace;
 private Form equationForm = Form.USER;
 public GeoCoordSys1D(Construction c) {
  this(c, false);
 }
 public GeoCoordSys1D(Construction c, boolean isIntersection) {
  super(c);
  this.isIntersection = isIntersection;
  setConstructionDefaults(); 
  coordsys = new CoordSys(1);
 }
 public GeoCoordSys1D(Construction c, Coords O, Coords V) {
  this(c);
  setCoord(O, V);
 }
 public GeoCoordSys1D(Construction c, GeoPointND O, GeoPointND I) {
  this(c, O, I, false);
 }
 public GeoCoordSys1D(Construction c, GeoPointND O, GeoPointND I, boolean isIntersection) {
  this(c, isIntersection);
  setCoord(O, I);
 }
 public boolean isDefined() {
  return coordsys.isDefined();
 }
 public void setUndefined() {
  coordsys.setUndefined();
 }
 public void setCoordFromPoints(Coords a_O, Coords a_I) {
  setCoord(a_O, a_I.sub(a_O));
 }
 public void setCoord(Coords o, Coords v) {
  coordsys.resetCoordSys();
  coordsys.addPoint(o);
  coordsys.addVector(v);
  coordsys.makeOrthoMatrix(false, false);
 }
 public final void setLineThrough(double pointX, double pointY) {
  setCoord(new Coords(pointX, pointY, 0, 1), getDirectionInD3());
 }
 public boolean setCoord(GeoPointND O, GeoPointND I) {
  startPoint = O;
  endPoint = I;
  if ((O == null) || (I == null)) {
   return true;
  }
  if (I.isInfinite()) {
   if (O.isInfinite()) {
    setUndefined(); 
   } else {
    setCoord(O.getInhomCoordsInD3(), I.getCoordsInD3());
   }
   return true;
  } else if (O.isInfinite()) {
   setCoord(I.getInhomCoordsInD3(), O.getCoordsInD3());
   return true;
  } else {
   setCoord(O.getInhomCoordsInD3(), I.getInhomCoordsInD3().sub(O.getInhomCoordsInD3()));
   return false;
  }
 }
 public void setCoord(GeoCoordSys1D geo) {
  setCoord(geo.getCoordSys().getOrigin(), geo.getCoordSys().getVx());
 }
 public void set(GeoElementND geo) {
  if (geo instanceof GeoCoordSys1D) {
   if (!geo.isDefined()) {
    setUndefined();
   } else {
    setCoord((GeoCoordSys1D) geo);
   }
  } else if (geo instanceof GeoLineND) {
   if (!geo.isDefined()) {
    setUndefined();
   } else {
    setCoord(((GeoLineND) geo).getStartPoint(), ((GeoLineND) geo).getEndPoint());
   }
  }
 }
 protected abstract GeoCoordSys1D create(Construction cons1);
 public final GeoCoordSys1D copy() {
  GeoCoordSys1D geo = create(cons);
  geo.set(this);
  geo.setCoord(this);
  return geo;
 }
 public Coords getPoint(double lambda) {
  return coordsys.getPoint(lambda);
 }
 public Coords getPointInD(int dimension, double lambda) {
  Coords v = getPoint(lambda);
  switch (dimension) {
   case 3:
    return v;
   case 2:
    return new Coords(v.getX(), v.getY(), v.getW());
   default:
    return null;
  }
 }
 public double getUnit() {
  return getCoordSys().getVx().norm();
 }
 public Coords getMainDirection() {
  return getCoordSys().getMatrixOrthonormal().getVx();
 }
 public Coords getDirectionForEquation() {
  return getCoordSys().getVx();
 }
 public boolean isPath() {
  return true;
 }
 public void pointChanged(GeoPointND P) {
  double t = getParamOnLine(P);
  if (t < getMinParameter()) {
   t = getMinParameter();
  } else if (t > getMaxParameter()) {
   t = getMaxParameter();
  }
  PathParameter pp = P.getPathParameter();
  pp.setT(t);
  P.setCoords(getPoint(t), false);
 }
 public double getParamOnLine(GeoPointND P) {
  boolean done = false;
  double t = 0;
  if (P.isGeoElement3D() && ((GeoPoint3D) P).hasWillingCoords()) {
   if (((GeoPoint3D) P).hasWillingDirection()) {
    if (tmpCoords1 == null) {
     tmpCoords1 = Coords.createInhomCoorsInD3();
    }
    t = ((GeoPoint3D) P)
      .getWillingCoords()
      .projectedParameterOnLineWithDirection(
        coordsys.getOrigin(),
        coordsys.getVx(),
        ((GeoPoint3D) P).getWillingDirection(),
        tmpCoords1);
    done = true;
   } else {
    Coords preDirection = ((GeoPoint3D) P)
      .getWillingCoords()
      .sub(coordsys.getOrigin())
      .crossProduct(coordsys.getVx());
    if (preDirection.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
     preDirection = coordsys.getVy();
    }
    if (tmpCoords1 == null) {
     tmpCoords1 = Coords.createInhomCoorsInD3();
    }
    t = ((GeoPoint3D) P)
      .getWillingCoords()
      .projectedParameterOnLineWithDirection(
        coordsys.getOrigin(),
        coordsys.getVx(),
        preDirection.crossProduct4(coordsys.getVx()),
        tmpCoords1);
    done = true;
   }
  }
  if (!done) {
   Coords preDirection =
     P.getInhomCoordsInD3().sub(coordsys.getOrigin()).crossProduct(coordsys.getVx());
   if (preDirection.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
    preDirection = coordsys.getVy();
   }
   if (tmpCoords1 == null) {
    tmpCoords1 = Coords.createInhomCoorsInD3();
   }
   t = P.getInhomCoordsInD3()
     .projectedParameterOnLineWithDirection(
       coordsys.getOrigin(),
       coordsys.getVx(),
       preDirection.crossProduct4(coordsys.getVx()),
       tmpCoords1);
  }
  return t;
 }
 public void pathChanged(GeoPointND P) {
  if (!getKernel().usePathAndRegionParameters(P)) {
   pointChanged(P);
   return;
  }
  PathParameter pp = P.getPathParameter();
  P.setCoords(getPoint(pp.getT()), false);
 }
 public boolean isOnPath(GeoPointND PI, double eps) {
  if (PI.getPath() == this) {
   return true;
  }
  return isOnPath(PI.getCoordsInD3(), eps);
 }
 public boolean isOnPath(Coords coords, double eps) {
  return isOnFullLine(coords, eps);
 }
 public boolean isOnFullLine(Coords p, double eps) {
  Coords cross;
  if (DoubleUtil.isZero(p.getW())) { 
   cross = p.crossProduct(getDirectionInD3());
   return cross.equalsForKernel(0, Kernel.MIN_PRECISION);
  }
  Coords d = getDirectionInD3().normalized();
  Coords v = p.sub(getStartInhomCoords());
  Coords n = v.sub(d.mul(v.dotproduct(d)));
  return n.dotproduct(n) < eps * eps;
 }
 public boolean respectLimitedPath(Coords coords, double eps) {
  return true;
 }
 public abstract boolean isValidCoord(double x);
 protected void getStyleXML(XMLStringBuilder sb) {
  super.getStyleXML(sb);
  getLineStyleXML(sb);
 }
 public CoordSys getCoordSys() {
  return coordsys;
 }
 public Coords getLabelPosition() {
  return coordsys.getPoint(0.5);
 }
 public Coords getCartesianEquationVector(CoordMatrix m) {
  if (m == null) {
   return CoordMatrixUtil.lineEquationVector(
     getCoordSys().getOrigin(), getCoordSys().getVx());
  }
  return CoordMatrixUtil.lineEquationVector(
    getCoordSys().getOrigin(), getCoordSys().getVx(), m);
 }
 public Coords getStartInhomCoords() {
  return getCoordSys().getOrigin().getInhomCoordsInSameDimension();
 }
 public Coords getEndInhomCoords() {
  return getCoordSys().getPoint(1).getInhomCoordsInSameDimension();
 }
 public Coords getDirectionInD3() {
  return getCoordSys().getVx();
 }
 public GeoPointND getStartPoint() {
  return startPoint;
 }
 public GeoPointND getEndPoint() {
  return endPoint;
 }
 public boolean isIntersection() {
  return isIntersection;
 }
 public final boolean isTranslateable() {
  return true;
 }
 public final void translate(Coords v) {
  Coords o = getCoordSys().getOrigin();
  o.addInside(v);
  setCoord(o, getCoordSys().getVx());
 }
 public final ArrayList<GeoPointND> getPointsOnLine() {
  return pointsOnLine;
 }
 public final void setPointsOnLine(ArrayList<GeoPointND> points) {
  pointsOnLine = points;
 }
 public final void addPointOnLine(GeoPointND p) {
  if (pointsOnLine == null) {
   pointsOnLine = new ArrayList<>();
  }
  if (!pointsOnLine.contains(p)) {
   pointsOnLine.add(p);
  }
 }
 public final double distance(GeoLineND g) {
  double dist;
  Coords cVector = this.getDirectionInD3().crossProduct(g.getDirectionInD3());
  Coords diffPoints = this.getPointInD(3, 0)
    .getInhomCoordsInSameDimension()
    .sub(g.getPointInD(3, 0).getInhomCoordsInSameDimension());
  if (cVector.isZero()) { 
   Coords n =
     diffPoints.crossProduct(this.getDirectionInD3()).crossProduct(this.getDirectionInD3());
   dist = Math.abs(diffPoints.dotproduct(n.normalize()));
  } else {
   dist = Math.abs(diffPoints.dotproduct(cVector.normalize()));
  }
  return dist;
 }
 public boolean isMatrixTransformable() {
  return true;
 }
 public void matrixTransform(double a00, double a01, double a10, double a11) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = CoordMatrix4x4.identity();
  } else {
   tmpMatrix4x4.set(1, 3, 0);
   tmpMatrix4x4.set(1, 4, 0);
   tmpMatrix4x4.set(2, 3, 0);
   tmpMatrix4x4.set(2, 4, 0);
   tmpMatrix4x4.set(3, 1, 0);
   tmpMatrix4x4.set(3, 2, 0);
   tmpMatrix4x4.set(3, 3, 0);
   tmpMatrix4x4.set(3, 4, 0);
   tmpMatrix4x4.set(4, 1, 0);
   tmpMatrix4x4.set(4, 2, 0);
   tmpMatrix4x4.set(4, 3, 0);
   tmpMatrix4x4.set(4, 4, 1);
  }
  tmpMatrix4x4.set(1, 1, a00);
  tmpMatrix4x4.set(1, 2, a01);
  tmpMatrix4x4.set(2, 1, a10);
  tmpMatrix4x4.set(2, 2, a11);
  setCoord(
    tmpMatrix4x4.mul(getCoordSys().getOrigin()),
    tmpMatrix4x4.mul(getCoordSys().getVx()));
 }
 public void matrixTransform(
   double a00,
   double a01,
   double a02,
   double a10,
   double a11,
   double a12,
   double a20,
   double a21,
   double a22) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = CoordMatrix4x4.identity();
  } else {
   tmpMatrix4x4.set(1, 4, 0);
   tmpMatrix4x4.set(2, 4, 0);
   tmpMatrix4x4.set(3, 4, 0);
   tmpMatrix4x4.set(4, 1, 0);
   tmpMatrix4x4.set(4, 2, 0);
   tmpMatrix4x4.set(4, 3, 0);
   tmpMatrix4x4.set(4, 4, 1);
  }
  tmpMatrix4x4.set(1, 1, a00);
  tmpMatrix4x4.set(1, 2, a01);
  tmpMatrix4x4.set(1, 3, a02);
  tmpMatrix4x4.set(2, 1, a10);
  tmpMatrix4x4.set(2, 2, a11);
  tmpMatrix4x4.set(2, 3, a12);
  tmpMatrix4x4.set(3, 1, a20);
  tmpMatrix4x4.set(3, 2, a21);
  tmpMatrix4x4.set(3, 3, a22);
  setCoord(
    tmpMatrix4x4.mul(getCoordSys().getOrigin()),
    tmpMatrix4x4.mul(getCoordSys().getVx()));
 }
 public boolean isTraceable() {
  return true;
 }
 public void setTrace(boolean trace) {
  this.trace = trace;
 }
 public boolean getTrace() {
  return trace;
 }
 public void rotate(NumberValue phiValue) {
  Coords o = getCoordSys().getOrigin();
  double z = o.getZ();
  double phi = phiValue.getDouble();
  double cos = Math.cos(phi);
  double sin = Math.sin(phi);
  double x = o.getX();
  double y = o.getY();
  double w = o.getW();
  Coords oRot = new Coords(x * cos - y * sin, x * sin + y * cos, z, w);
  Coords v = getCoordSys().getVx();
  double vz = v.getZ();
  double vx = v.getX();
  double vy = v.getY();
  double vw = v.getW();
  Coords vRot = new Coords(vx * cos - vy * sin, vx * sin + vy * cos, vz, vw);
  setCoord(oRot, vRot);
 }
 public final void rotate(NumberValue phiValue, GeoPointND point) {
  Coords o = getCoordSys().getOrigin();
  double phi = phiValue.getDouble();
  double cos = Math.cos(phi);
  double sin = Math.sin(phi);
  double x = o.getX();
  double y = o.getY();
  double z = o.getZ();
  double w = o.getW();
  Coords Q = point.getInhomCoords();
  double qx = w * Q.getX();
  double qy = w * Q.getY();
  Coords oRot = new Coords(
    (x - qx) * cos + (qy - y) * sin + qx, (x - qx) * sin + (y - qy) * cos + qy, z, w);
  Coords v = getCoordSys().getVx();
  double vx = v.getX();
  double vy = v.getY();
  double vz = v.getZ();
  double vw = v.getW();
  Coords vRot = new Coords(vx * cos - vy * sin, vx * sin + vy * cos, vz, vw);
  setCoord(oRot, vRot);
 }
 private void rotate(NumberValue phiValue, Coords o1, Coords vn) {
  if (vn.isZero()) {
   setUndefined();
   return;
  }
  Coords vn2 = vn.normalized();
  Coords point = getCoordSys().getOrigin();
  if (tmpCoords1 == null) {
   tmpCoords1 = Coords.createInhomCoorsInD3();
  }
  point.projectLine(o1, vn, tmpCoords1, null); 
  Coords v1 = point.sub(tmpCoords1); 
  Coords v = getCoordSys().getVx(); 
  double phi = phiValue.getDouble();
  double cos = Math.cos(phi);
  double sin = Math.sin(phi);
  Coords v2 = vn2.crossProduct4(v1);
  Coords oRot = tmpCoords1.addInsideMul(v1, cos).addInsideMul(v2, sin);
  v2 = vn2.crossProduct4(v);
  v1 = v2.crossProduct4(vn2);
  Coords vRot = v1.mul(cos).addInsideMul(v2, sin).addInsideMul(vn2, v.dotproduct(vn2));
  setCoord(oRot, vRot);
 }
 public void rotate(NumberValue phiValue, Coords S, GeoDirectionND orientation) {
  Coords vn = orientation.getDirectionInD3();
  rotate(phiValue, S, vn);
 }
 public void mirror(Coords Q) {
  Coords o = getCoordSys().getOrigin().mul(-1);
  o.addInside(Q.mul(2));
  setCoord(o, getCoordSys().getVx().mul(-1));
 }
 public void mirror(GeoLineND line) {
  Coords o1 = line.getStartInhomCoords();
  Coords vn = line.getDirectionInD3();
  Coords point = getCoordSys().getOrigin();
  if (tmpCoords1 == null) {
   tmpCoords1 = Coords.createInhomCoorsInD3();
  }
  point.projectLine(o1, vn, tmpCoords1, null); 
  point.mulInside(-1);
  point.addInsideMul(tmpCoords1, 2);
  double l = vn.getNorm();
  Coords v = getCoordSys().getVx();
  setCoord(point, vn.copy().mulInside(2 * v.dotproduct(vn) / (l * l)).addInsideMul(v, -1));
 }
 public void mirror(GeoCoordSys2D plane) {
  Coords point = getCoordSys().getOrigin();
  if (tmpCoords1 == null) {
   tmpCoords1 = Coords.createInhomCoorsInD3();
  }
  point.projectPlane(plane.getCoordSys().getMatrixOrthonormal(), tmpCoords1);
  point.mulInside(-1);
  point.addInside(tmpCoords1.mulInside(2));
  Coords vn = plane.getDirectionInD3().normalized();
  Coords v = getCoordSys().getVx();
  if (tmpCoords2 == null) {
   tmpCoords2 = new Coords(4);
  }
  setCoord(point, tmpCoords1.setAdd(v, tmpCoords2.setMul(vn, -2 * v.dotproduct(vn))));
 }
 public void dilate(NumberValue rval, Coords S) {
  double r = rval.getDouble();
  Coords o = getCoordSys().getOrigin().mul(r);
  o.addInside(S.mul(1 - r));
  setCoord(o, getCoordSys().getVx().mul(r));
 }
 public ExpressionValue evaluateCurve(double t) {
  Coords O = coordsys.getOrigin(); 
  Coords V = coordsys.getVx();
  if (getParentAlgorithm() instanceof AlgoLinePoint) {
   AlgoLinePoint algoLP = (AlgoLinePoint) getParentAlgorithm();
   GeoElement[] geos = algoLP.getInput();
   if (geos[0].isGeoPoint() && geos[1].isGeoVector()) {
    GeoPointND pt = (GeoPointND) geos[0];
    O = pt.getInhomCoordsInD3();
    GeoVectorND vec = (GeoVectorND) geos[1];
    V = vec.getCoordsInD3();
   }
  }
  return new Geo3DVec(
    kernel, O.get(1) + t * V.get(1), O.get(2) + t * V.get(2), O.get(3) + t * V.get(3));
 }
 public @Nullable Form getEquationForm() {
  return equationForm;
 }
 public void setEquationForm(@Nullable Form equationForm) {
  if (equationForm != null) {
   this.equationForm = equationForm;
  }
 }
 public void setToGeneralForm() {
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoCursor3D.java
```java
public class GeoCursor3D extends GeoPoint3D {
 public static final long NO_SOURCE = App.CE_ID_COUNTER_START - 1;
 public static final long CAPTURED = App.CE_ID_COUNTER_START - 2;
 private boolean isCaptured;
 private long source1;
 private long source2;
 public GeoCursor3D(Construction c) {
  super(c);
 }
 public void setIsCaptured(boolean flag) {
  isCaptured = flag;
 }
 public boolean getIsCaptured() {
  return isCaptured;
 }
 public void setSource(long source) {
  setSource(source, NO_SOURCE);
 }
 public void setSource(long source1, long source2) {
  this.source1 = source1;
  this.source2 = source2;
 }
 public long getSource1() {
  return source1;
 }
 public long getSource2() {
  return source2;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoCurveCartesian3D.java
```java
public class GeoCurveCartesian3D extends GeoCurveCartesianND
  implements RotatableND, MirrorableAtPlane, Transformable, Dilateable {
 private CoordMatrix4x4 tmpMatrix4x4;
 private boolean trace;
 public GeoCurveCartesian3D(Construction c) {
  super(c, 3, null);
 }
 public GeoCurveCartesian3D(Construction c, Function[] fun, ExpressionNode point) {
  super(c, fun, point);
 }
 public GeoCurveCartesian3D(GeoCurveCartesian3D curve) {
  super(curve.cons, 3, null);
  set(curve);
 }
 public Function getFun(int i) {
  return fun[i];
 }
 public Coords evaluateTangent(double t) {
  updateDerivatives();
  Coords v = new Coords(3);
  for (int i = 0; i < 3; i++) {
   v.set(i + 1, funD1[i].value(t));
  }
  return v.normalized();
 }
 public void evaluateCurve(double t, double[] out) {
  for (int i = 0; i < 3; i++) {
   out[i] = fun[i].value(t);
  }
 }
 public double[] newDoubleArray() {
  return new double[3];
 }
 public Coords evaluateCurve3D(double t) {
  return new Coords(fun[0].value(t), fun[1].value(t), fun[2].value(t), 1);
 }
 public double evaluateCurvature(double t) {
  updateDerivatives();
  Coords D1 = new Coords(3);
  Coords D2 = new Coords(3);
  for (int i = 0; i < 3; i++) {
   D1.set(i + 1, funD1[i].value(t));
  }
  for (int i = 0; i < 3; i++) {
   D2.set(i + 1, funD2[i].value(t));
  }
  Coords cross = D1.crossProduct(D2);
  return cross.norm() / Math.pow(D1.norm(), 3);
 }
 private void updateDerivatives() {
  int dim = 3;
  funD1 = new Function[dim];
  funD2 = new Function[dim];
  for (int i = 0; i < dim; i++) {
   funD1[i] = getFun(i).getDerivative(1, true);
   funD2[i] = getFun(i).getDerivative(2, true);
  }
 }
 public GeoElement copy() {
  return new GeoCurveCartesian3D(this);
 }
 public void set(GeoElementND geo) {
  if (!(geo instanceof GeoCurveCartesianND)) {
   return;
  }
  GeoCurveCartesianND geoCurve = (GeoCurveCartesianND) geo;
  for (int i = 0; i < 2; i++) {
   fun[i] = new Function(geoCurve.getFun(i), kernel);
  }
  if (geoCurve.isGeoElement3D()) {
   fun[2] = new Function(geoCurve.getFun(2), kernel);
  } else { 
   fun[2] = new Function(new ExpressionNode(kernel, 0), new FunctionVariable(kernel, "t"));
  }
  startParam = geoCurve.getMinParameter();
  endParam = geoCurve.getMaxParameter();
  isDefined = geoCurve.isDefined();
  if (geo.getConstruction() != cons && isAlgoMacroOutput()) {
   if (!geo.isIndependent()) {
    AlgoMacro algoMacro = (AlgoMacro) getParentAlgorithm();
    for (int i = 0; i < 3; i++) {
     algoMacro.initFunction(fun[i]);
    }
   }
  }
 }
 protected boolean showInEuclidianView() {
  return true;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.CURVE_CARTESIAN3D;
 }
 public Coords getLabelPosition() {
  return Coords.O; 
 }
 public boolean isGeoElement3D() {
  return true;
 }
 public boolean hasFillType() {
  return false;
 }
 public boolean isTraceable() {
  return true;
 }
 public void setTrace(boolean trace) {
  this.trace = trace;
 }
 public boolean getTrace() {
  return trace;
 }
 public void rotate(NumberValue r, GeoPointND S) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  SurfaceTransform.rotate(fun, kernel, r, S, tmpMatrix4x4);
 }
 public void rotate(NumberValue r) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  SurfaceTransform.rotate(fun, kernel, r, tmpMatrix4x4);
 }
 public void rotate(NumberValue r, Coords S, GeoDirectionND orientation) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  SurfaceTransform.rotate(fun, kernel, r, S, orientation, tmpMatrix4x4);
 }
 public double[] getDefinedInterval(double a, double b) {
  return getDefinedInterval(a, b, fun[0], fun[1], fun[2]);
 }
 public static double[] getDefinedInterval(
   double a,
   double b,
   UnivariateFunction funX,
   UnivariateFunction funY,
   UnivariateFunction funZ) {
  double[] interval = RealRootUtil.getDefinedInterval(funX, a, b);
  RealRootUtil.updateDefinedIntervalIntersecting(funY, a, b, interval);
  RealRootUtil.updateDefinedIntervalIntersecting(funZ, a, b, interval);
  return interval;
 }
 public static double[] getDefinedInterval(
   double a,
   double b,
   UnivariateFunction funX,
   UnivariateFunction funY,
   UnivariateFunction funZ,
   UnivariateFunction fun) {
  double[] interval = getDefinedInterval(a, b, funX, funY, funZ);
  RealRootUtil.updateDefinedIntervalIntersecting(fun, a, b, interval);
  return interval;
 }
 public boolean isClosedPath() {
  return false;
 }
 public PathMover createPathMover() {
  return new PathMoverGeneric(this);
 }
 public void pointChanged(GeoPointND P) {
  PathParameter pp = P.getPathParameter();
  double t = getClosestParameter(P, pp.t);
  pp.t = t;
  pathChanged(P, false);
 }
 public boolean isOnPath(GeoPointND PI, double eps) {
  if (PI.getPath() == this) {
   return true;
  }
  PathParameter pp = PI.getPathParameter();
  double t = getClosestParameter(PI, pp.t);
  Coords coords = PI.getInhomCoordsInD3();
  boolean onPath = Math.abs(fun[0].value(t) - coords.getX()) <= eps
    && Math.abs(fun[1].value(t) - coords.getY()) <= eps
    && Math.abs(fun[2].value(t) - coords.getZ()) <= eps;
  return onPath;
 }
 public void pathChanged(GeoPointND PI) {
  pathChanged(PI, !getKernel().usePathAndRegionParameters(PI));
 }
 private void pathChanged(GeoPointND P, boolean changePoint) {
  if (changePoint) {
   pointChanged(P);
   return;
  }
  PathParameter pp = P.getPathParameter();
  if (pp.t < startParam) {
   pp.t = startParam;
  } else if (pp.t > endParam) {
   pp.t = endParam;
  }
  P.setCoords(evaluateCurve3D(pp.t), false);
 }
 public void updateDistanceFunction() {
  if (distFun == null) {
   distFun = new CurveCartesian3DDistanceFunction(this);
  }
 }
 protected DistanceFunction createDistanceFunction() {
  return new CurveCartesian3DDistanceFunction(this);
 }
 private static final class CurveCartesian3DDistanceFunction implements DistanceFunction {
  private Coords distCoords;
  private Coords distDirection;
  private GeoCurveCartesian3D curve;
  private CurveCartesian3DDistanceFunction(GeoCurveCartesian3D curve) {
   this.curve = curve;
  }
  public void setDistantPoint(GeoPointND p) {
   if (p.isGeoElement3D()) {
    GeoPoint3D p3D = (GeoPoint3D) p;
    if (p3D.hasWillingCoords()) {
     distCoords = p3D.getWillingCoords();
    } else {
     distCoords = p3D.getInhomCoordsInD3();
    }
    distDirection = p3D.getWillingDirection(); 
   } else {
    distCoords = p.getInhomCoordsInD3();
    distDirection = null;
   }
  }
  public double value(double t) {
   Coords eval = curve.evaluateCurve3D(t);
   if (distDirection == null || !distDirection.isDefined()) {
    return eval.squareDistance3(distCoords);
   }
   return eval.squareDistLine3(distCoords, distDirection);
  }
 }
 public void translate(Coords v) {
  for (int i = 0; i < 3; i++) {
   ExpressionNode expr = fun[i].deepCopy(kernel).getExpression();
   ExpressionNode trans = expr.plus(v.get(i + 1));
   fun[i].setExpression(trans);
  }
 }
 public boolean isTranslateable() {
  return true;
 }
 public void mirror(Coords Q) {
  dilate(new MyDouble(kernel, -1.0), Q);
 }
 public void mirror(GeoLineND line) {
  SurfaceTransform.mirror(fun, kernel, line);
 }
 public void mirror(GeoCoordSys2D plane) {
  SurfaceTransform.mirror(fun, kernel, plane);
 }
 public void dilate(NumberValue ratio, Coords P) {
  translate(P.mul(-1));
  for (int i = 0; i < 3; i++) {
   ExpressionNode expr = fun[i].deepCopy(kernel).getExpression();
   fun[i].setExpression(new ExpressionNode(kernel, ratio, Operation.MULTIPLY, expr));
  }
  translate(P);
 }
 public void clearCasEvalMap() {
 }
 public boolean isFunctionInX() {
  return false;
 }
 public double distanceMax(double[] p1, double[] p2) {
  return Math.max(
    Math.max(Math.abs(p1[0] - p2[0]), Math.abs(p1[1] - p2[1])), Math.abs(p1[2] - p2[2]));
 }
 public Geo3DVec evaluateCurve(double t) {
  return new Geo3DVec(
    this.kernel, getFun(0).value(t), getFun(1).value(t), getFun(2).value(t));
 }
 protected GeoCurveCartesianND newGeoCurveCartesian(Construction cons1) {
  return new GeoCurveCartesian3D(cons1);
 }
 public ValueType getValueType() {
  return ValueType.PARAMETRIC3D;
 }
 public UnivariateFunction getUnivariateFunctionX() {
  return null;
 }
 public UnivariateFunction getUnivariateFunctionY() {
  return null;
 }
 protected Coords pointToCoords(GeoPointND geoPointND) {
  return geoPointND.getInhomCoordsInD3();
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoElement3D.java
```java
public abstract class GeoElement3D extends GeoElement {
 private StringBuilder sbToString;
 private StringBuilder sbBuildValueString = new StringBuilder(50);
 public GeoElement3D(Construction c) {
  super(c);
 }
 public boolean isGeoElement3D() {
  return true;
 }
 public boolean hasFillType() {
  return false;
 }
 public abstract Coords getLabelPosition();
 public void setAlphaValue(double alpha) {
  if (alpha < 0.0 || alpha > 1.0) {
   return;
  }
  alphaValue = alpha;
 }
 protected StringBuilder getSbToString() {
  if (sbToString == null) {
   sbToString = new StringBuilder(50);
  }
  return sbToString;
 }
 protected StringBuilder getSbBuildValueString() {
  if (sbBuildValueString == null) {
   sbBuildValueString = new StringBuilder();
  } else {
   sbBuildValueString.setLength(0);
  }
  return sbBuildValueString;
 }
 public boolean isWhollyIn2DView(EuclidianView ev) {
  Log.debug(
    "isWhollyIn2DView unimplemented for " + this.getClass() + " " + this.getGeoClassType());
  return false;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoLine3D.java
```java
public class GeoLine3D extends GeoCoordSys1D {
 private String parameter = Unicode.lambda_STRING;
 private boolean showUndefinedInAlgebraView = false;
 public GeoLine3D(Construction c, GeoPointND O, GeoPointND I) {
  super(c, O, I);
 }
 public GeoLine3D(Construction c) {
  this(c, false);
 }
 public GeoLine3D(Construction c, boolean isIntersection) {
  super(c, isIntersection);
 }
 public GeoLine3D(Construction c, Coords o, Coords v) {
  super(c, o, v);
 }
 public void setToParametricForm(String parameter) {
  this.parameter = parameter;
 }
 public final void setStartPoint(GeoPointND P) {
  startPoint = P;
 }
 protected GeoCoordSys1D create(Construction cons1) {
  return new GeoLine3D(cons1);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.LINE3D;
 }
 public ExtendedBoolean isEqualExtended(GeoElementND geo) {
  if (geo instanceof GeoLineND) {
   Coords diff =
     ((GeoLineND) geo).getDirectionInD3().crossProduct(getDirectionInD3().normalize());
   return ExtendedBoolean.newExtendedBoolean(diff.isZero()
     && getCoordSys()
       .getOrigin()
       .sub(((GeoLineND) geo).getOrigin())
       .crossProduct(getDirectionInD3())
       .isZero());
  }
  return ExtendedBoolean.FALSE;
 }
 public void showUndefinedInAlgebraView(boolean flag) {
  showUndefinedInAlgebraView = flag;
 }
 public boolean showInAlgebraView() {
  return isDefined() || showUndefinedInAlgebraView;
 }
 protected boolean showInEuclidianView() {
  return coordsys.isDefined();
 }
 public String toValueString(StringTemplate tpl) {
  return buildValueString(tpl).toString();
 }
 public final String toString(StringTemplate tpl) {
  StringBuilder sbToString = getSbToString();
  sbToString.setLength(0);
  sbToString.append(label);
  sbToString.append(": "); 
  sbToString.append(buildValueString(tpl));
  return sbToString.toString();
 }
 private StringBuilder buildValueString(StringTemplate tpl) {
  StringBuilder sbToString = getSbBuildValueString();
  if (!isDefined()) {
   sbToString.append("X = (?, ?, ?)");
   return sbToString;
  }
  AlgoElement algo = getParentAlgorithm();
  Coords O = coordsys.getOrigin(); 
  Coords V = coordsys.getVx();
  if (algo instanceof AlgoLinePoint) {
   AlgoLinePoint algoLP = (AlgoLinePoint) algo;
   GeoElement[] geos = algoLP.getInput();
   if (geos[0].isGeoPoint() && geos[1].isGeoVector()) {
    GeoPointND pt = (GeoPointND) geos[0];
    O = pt.getInhomCoordsInD3();
    GeoVectorND vec = (GeoVectorND) geos[1];
    V = vec.getCoordsInD3();
   }
  }
  sbToString.append("X");
  tpl.appendOptionalSpace(sbToString);
  sbToString.append("=");
  tpl.appendOptionalSpace(sbToString);
  sbToString.append("(");
  sbToString.append(kernel.format(O.get(1), tpl));
  coordDelimiter(sbToString, tpl);
  sbToString.append(kernel.format(O.get(2), tpl));
  coordDelimiter(sbToString, tpl);
  sbToString.append(kernel.format(O.get(3), tpl));
  sbToString.append(")");
  tpl.appendOptionalSpace(sbToString);
  sbToString.append("+");
  tpl.appendOptionalSpace(sbToString);
  sbToString.append(parameter);
  if (tpl.hasCASType()) {
   sbToString.append("*");
  }
  sbToString.append(" (");
  sbToString.append(kernel.format(V.get(1), tpl));
  coordDelimiter(sbToString, tpl);
  sbToString.append(kernel.format(V.get(2), tpl));
  coordDelimiter(sbToString, tpl);
  sbToString.append(kernel.format(V.get(3), tpl));
  sbToString.append(")");
  return sbToString;
 }
 private void coordDelimiter(StringBuilder sbToString, StringTemplate tpl) {
  sbToString.append(",");
  tpl.appendOptionalSpace(sbToString);
 }
 protected void getXMLTags(XMLStringBuilder sb) {
  super.getXMLTags(sb);
  getCoordsXML(sb);
 }
 protected void getStyleXML(XMLStringBuilder sb) {
  super.getStyleXML(sb);
  XMLBuilder.appendEquationTypeLine(sb, Form.PARAMETRIC, parameter);
 }
 protected void getCoordsXML(XMLStringBuilder sb) {
  Coords o = coordsys.getOrigin(); 
  Coords v = coordsys.getVx();
  sb.startTag("coords");
  sb.attr("ox", o.getX());
  sb.attr("oy", o.getY());
  sb.attr("oz", o.getZ());
  sb.attr("ow", o.getW());
  sb.attr("vx", v.getX());
  sb.attr("vy", v.getY());
  sb.attr("vz", v.getZ());
  sb.attr("vw", v.getW());
  sb.endTag();
 }
 public final boolean isGeoLine() {
  return true;
 }
 public PathMover createPathMover() {
  return new PathMoverGeneric(this);
 }
 public double getMaxParameter() {
  return Double.POSITIVE_INFINITY;
 }
 public double getMinParameter() {
  return Double.NEGATIVE_INFINITY;
 }
 public boolean isClosedPath() {
  return false;
 }
 public boolean isValidCoord(double x) {
  return true;
 }
 public final void removePointOnLine(GeoPointND p) {
 }
 public boolean respectLimitedPath(double param) {
  return true;
 }
 public GeoPointND setStandardStartPoint() {
  return startPoint;
 }
 public boolean isParametric() {
  return true;
 }
 public ValueType getValueType() {
  return ValueType.PARAMETRIC3D;
 }
 public ExtendedBoolean isCongruent(GeoElement geo) {
  return ExtendedBoolean.newExtendedBoolean(geo.isGeoLine());
 }
 public Coords getOrigin() {
  return getCoordSys().getOrigin();
 }
 public char getLabelDelimiter() {
  return ':';
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoLocus3D.java
```java
public class GeoLocus3D extends GeoLocusND<MyPoint3D> {
 private GeoPointND changingPoint;
 private Coords changingCoords;
 public GeoLocus3D(Construction c) {
  super(c);
 }
 protected GeoLocus3D newGeoLocus() {
  return new GeoLocus3D(cons);
 }
 public void insertPoint(double x, double y, double z, boolean lineTo) {
  myPointList.add(new MyPoint3D(x, y, z, lineTo ? SegmentType.LINE_TO : SegmentType.MOVE_TO));
 }
 public boolean isGeoElement3D() {
  return true;
 }
 public boolean hasFillType() {
  return false;
 }
 public void pointChanged(GeoPointND P) {
  Coords coords = P.getInhomCoordsInD3();
  setChangingPoint(P);
  MyPoint closestPoint = getClosestPoint();
  PathParameter pp = P.getPathParameter();
  if (closestPoint != null) {
   coords.setX(closestPoint.x); 
   coords.setY(closestPoint.y); 
   coords.setZ(closestPoint.getZ());
   coords.setW(1.0);
   pp.t = closestPointIndex + closestPointParameter;
  }
  P.setCoords(coords, false);
  P.updateCoords();
 }
 protected GeoSegmentND newGeoSegment() {
  GeoSegment3D segment = new GeoSegment3D(cons);
  return segment;
 }
 protected void setChangingPoint(GeoPointND P) {
  changingPoint = P;
  changingCoords = P.getInhomCoordsInD3();
 }
 protected double changingPointDistance(GeoSegmentND segment) {
  GeoSegment3D seg = (GeoSegment3D) segment;
  double t = seg.getParamOnLine(changingPoint);
  if (t < 0) {
   t = 0;
  } else if (t > 1) {
   t = 1;
  }
  Coords project = seg.getPoint(t);
  Coords coords = changingCoords;
  if (changingPoint.isGeoElement3D()) {
   if (((GeoPoint3D) changingPoint).hasWillingCoords()) {
    coords = ((GeoPoint3D) changingPoint).getWillingCoords();
    if (((GeoPoint3D) changingPoint).hasWillingDirection()) {
     return project.distLine(coords, ((GeoPoint3D) changingPoint).getWillingDirection());
    }
   }
  }
  return coords.distance(project);
 }
 protected double getChangingPointParameter(GeoSegmentND segment) {
  return ((GeoSegment3D) segment).getParamOnLine(changingPoint);
 }
 public ValueType getValueType() {
  return ValueType.PARAMETRIC3D;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoPlane3D.java
```java
public class GeoPlane3D extends GeoElement3D
  implements Functional2Var,
    ViewCreator,
    GeoCoords4D,
    GeoPlaneND,
    Translateable,
    Traceable,
    RotatableND,
    MirrorableAtPlane,
    Transformable,
    Dilateable,
    MatrixTransformable {
 private double xmin;
 private double xmax;
 private double ymin;
 private double ymax;
 private double xPlateMin;
 private double xPlateMax;
 private double yPlateMin;
 private double yPlateMax;
 private boolean plateVisible = true;
 private double dx = Double.NaN; 
 private double dy = Double.NaN;
 protected CoordSys coordsys;
 private float fading = 0.10f;
 private EuclidianViewForPlaneCompanionInterface euclidianViewForPlane;
 private Coords tmpCoords1;
 private Coords tmpCoords2;
 private Coords canceledEquation = new Coords(4);
 private boolean trace;
 private static final String[] VAR_STRING = {"x", "y", "z"};
 protected Form equationForm = Form.USER;
 public GeoPlane3D(Construction c) {
  super(c);
  setConstructionDefaults(); 
  coordsys = new CoordSys(2);
  this.xmin = -2.5;
  this.xmax = 2.5;
  this.ymin = -2.5;
  this.ymax = 2.5;
 }
 public GeoPlane3D(Construction cons, double a, double b, double c, double d) {
  this(cons);
  setEquation(a, b, c, d);
 }
 public void setEquation(double a, double b, double c, double d) {
  setEquation(a, b, c, d, true);
 }
 public void setCoords(double x, double y, double z, double w) {
  setEquation(x, y, z, w, false);
 }
 private void setEquation(double a, double b, double c, double d, boolean makeCoordSys) {
  if (makeCoordSys || !getCoordSys().isDefined()) {
   setDefinition(null);
   getCoordSys().makeCoordSys(a, b, c, d);
   getCoordSys().makeOrthoMatrix(true, true);
  }
 }
 public boolean isRegion() {
  return true;
 }
 public Coords[] getNormalProjection(Coords coords) {
  return getCoordSys().getNormalProjection(coords);
 }
 public Coords[] getProjection(Coords oldCoords, Coords willingCoords, Coords willingDirection) {
  Coords[] result = new Coords[] {new Coords(4), new Coords(4)};
  willingCoords.projectPlaneThruVIfPossible(
    getCoordSys().getMatrixOrthonormal(), oldCoords, willingDirection, result[0], result[1]);
  return result;
 }
 public boolean isInRegion(GeoPointND P) {
  Coords planeCoords = getNormalProjection(P.getInhomCoordsInD3())[1];
  return DoubleUtil.isEqual(planeCoords.get(3), 0, Kernel.STANDARD_PRECISION);
 }
 public boolean isInRegion(double x0, double y0) {
  return true;
 }
 public void pointChangedForRegion(GeoPointND P) {
  P.updateCoords2D();
  P.updateCoordsFrom2D(false, null);
 }
 public void regionChanged(GeoPointND P) {
  if (!getKernel().usePathAndRegionParameters(P) || P.getRegionParameters().isNaN()) {
   pointChangedForRegion(P);
   return;
  }
  RegionParameters rp = P.getRegionParameters();
  P.setCoords(getPoint(rp.getT1(), rp.getT2(), new Coords(4)), false);
 }
 public Coords getPoint(double x2d, double y2d, Coords coords) {
  return getCoordSys().getPoint(x2d, y2d, coords);
 }
 public void setPlateCorners(double x1, double y1, double x2, double y2) {
  if (x1 < x2) {
   this.xPlateMin = x1;
   this.xPlateMax = x2;
  } else {
   this.xPlateMin = x2;
   this.xPlateMax = x1;
  }
  if (y1 < y2) {
   this.yPlateMin = y1;
   this.yPlateMax = y2;
  } else {
   this.yPlateMin = y2;
   this.yPlateMax = y1;
  }
 }
 public void setGridCorners(double x1, double y1, double x2, double y2) {
  if (x1 < x2) {
   this.xmin = x1;
   this.xmax = x2;
  } else {
   this.xmin = x2;
   this.xmax = x1;
  }
  if (y1 < y2) {
   this.ymin = y1;
   this.ymax = y2;
  } else {
   this.ymin = y2;
   this.ymax = y1;
  }
 }
 public void setGridDistances(double dx, double dy) {
  this.dx = dx;
  this.dy = dy;
 }
 public double getXmin() {
  return xmin;
 }
 public double getYmin() {
  return ymin;
 }
 public double getXmax() {
  return xmax;
 }
 public double getYmax() {
  return ymax;
 }
 public double getXPlateMin() {
  return xPlateMin;
 }
 public double getYPlateMin() {
  return yPlateMin;
 }
 public double getXPlateMax() {
  return xPlateMax;
 }
 public double getYPlateMax() {
  return yPlateMax;
 }
 public boolean isGridVisible() {
  return getLineThickness() > 0 && isEuclidianVisible();
 }
 public boolean isPlateVisible() {
  return plateVisible && isEuclidianVisible();
 }
 public void setPlateVisible(boolean flag) {
  plateVisible = flag;
 }
 public double getGridXd() {
  return dx;
 }
 public double getGridYd() {
  return dy;
 }
 public Coords getMainDirection() {
  return getCoordSys().getNormal();
 }
 public Coords getLabelPosition() {
  return getCoordSys().getPoint(0.5, 0.5);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.PLANE3D;
 }
 public GeoPlane3D copy() {
  GeoPlane3D p = new GeoPlane3D(cons);
  p.set(this);
  return p;
 }
 public ExtendedBoolean isEqualExtended(GeoElementND geo) {
  if (!geo.isDefined() || !isDefined()) {
   return ExtendedBoolean.FALSE;
  }
  if (geo.isGeoPlane()) {
   Coords ev1 = getCoordSys().getEquationVector();
   Coords ev2 = ((GeoPlane3D) geo).getCoordSys().getEquationVector();
   return ExtendedBoolean.newExtendedBoolean(!ev1.isLinearIndependentAllCoords(ev2));
  }
  return ExtendedBoolean.FALSE;
 }
 public void set(GeoElementND geo) {
  if (geo instanceof GeoPlane3D) {
   GeoPlane3D plane = (GeoPlane3D) geo;
   getCoordSys().set(plane.getCoordSys());
   reuseDefinition(geo);
   return;
  }
  setDefinition(null);
  if (geo instanceof GeoLine) {
   GeoLine line = (GeoLine) geo;
   setEquation(line.getX(), line.getY(), 0, line.getZ());
  } else {
   setUndefined();
  }
 }
 public void setCoordSys(CoordSys cs) {
  getCoordSys().set(cs);
 }
 public void setBasicVisualStyle(GeoElement geo) {
  super.setBasicVisualStyle(geo);
  if (geo.isGeoPlane()) {
   setFading(((GeoPlaneND) geo).getFading());
  }
 }
 public void setUndefined() {
  coordsys.setUndefined();
  setDefinition(null);
 }
 protected boolean showInEuclidianView() {
  return isDefined();
 }
 public String toValueString(StringTemplate tpl) {
  if (!isDefinitionValid()) {
   return "?";
  }
  if (getEquationForm() == Form.USER && getDefinition() != null) {
   return getDefinition().toValueString(tpl);
  }
  canceledEquation.set(getCoordSys().getEquationVector());
  return buildValueString(tpl, kernel, canceledEquation, !isLabelSet()).toString();
 }
 public final String toString(StringTemplate tpl) {
  return label + ": " + toValueString(tpl);
 }
 public @Nullable Form getEquationForm() {
  return equationForm;
 }
 public void setEquationForm(@Nullable Form equationForm) {
  if (equationForm != null) {
   this.equationForm = equationForm;
  }
 }
 public void setToParametricForm(String parameter) {
 }
 public static StringBuilder buildValueString(
   StringTemplate tpl, Kernel kernel, Coords coords, boolean needsZ) {
  return kernel.buildImplicitEquation(coords.get(), VAR_STRING, true, needsZ, tpl, true);
 }
 public boolean isFillable() {
  return true;
 }
 public Coords evaluateNormal(double u, double v) {
  return coordsys.getNormal();
 }
 public void evaluatePoint(double u, double v, Coords point) {
  coordsys.getPointForDrawing(u, v, point);
 }
 public double getMinParameter(int index) {
  return 0; 
 }
 public double getMaxParameter(int index) {
  return 0; 
 }
 public CoordSys getCoordSys() {
  return coordsys;
 }
 public boolean isDefined() {
  return coordsys.isDefined();
 }
 public boolean isDefinitionValid() {
  return isDefined() || (definition != null && bothSidesDefined(definition));
 }
 private static boolean bothSidesDefined(ExpressionNode definition) {
  ExpressionValue ev = definition.unwrap();
  if (ev instanceof Equation) {
   return Double.isFinite(((Equation) ev).getLHS().evaluateDouble())
     && Double.isFinite(((Equation) ev).getRHS().evaluateDouble());
  }
  return false;
 }
 public boolean isMoveable() {
  return false;
 }
 protected void getXMLTags(XMLStringBuilder sb) {
  super.getXMLTags(sb);
  Coords equation = getCoordSys().getEquationVector();
  sb.startTag("coords");
  sb.attr("x", equation.getX());
  sb.attr("y", equation.getY());
  sb.attr("z", equation.getZ());
  sb.attr("w", equation.getW());
  sb.endTag();
 }
 protected void getStyleXML(XMLStringBuilder sb) {
  super.getStyleXML(sb);
  sb.startTag("fading").attr("val", getFading()).endTag();
  getLineStyleXML(sb);
  XMLBuilder.appendEquationTypeLine(sb, getEquationForm(), null);
 }
 public boolean isGeoPlane() {
  return true;
 }
 public void setFading(float fading) {
  this.fading = fading;
 }
 public float getFading() {
  return fading;
 }
 public int getViewID() {
  return euclidianViewForPlane.getId();
 }
 public void createView2D() {
  euclidianViewForPlane =
    kernel.getApplication().getCompanion().createEuclidianViewForPlane(this, true);
  euclidianViewForPlane.setTransformRegardingView();
 }
 public void removeView2D() {
  euclidianViewForPlane.doRemove();
 }
 public void doRemove() {
  if (euclidianViewForPlane != null) {
   removeView2D();
  }
  super.doRemove();
 }
 public boolean hasView2DVisible() {
  return euclidianViewForPlane != null
    && kernel.getApplication().getGuiManager().showView(euclidianViewForPlane.getId());
 }
 public void setView2DVisible(boolean flag) {
  if (euclidianViewForPlane == null) {
   if (flag) {
    createView2D();
   }
   return;
  }
  kernel.getApplication().getGuiManager().setShowView(flag, euclidianViewForPlane.getId());
 }
 public void update(boolean drag) {
  super.update(drag);
  if (euclidianViewForPlane != null) {
   euclidianViewForPlane.updateForPlane();
  }
 }
 public void setEuclidianViewForPlane(EuclidianViewForPlaneCompanionInterface view) {
  euclidianViewForPlane = view;
 }
 public Coords getDirectionInD3() {
  return getCoordSys().getNormal();
 }
 public double distance(GeoPointND P) {
  return Math.abs(distanceWithSign(P));
 }
 public double distanceWithSign(GeoPointND P) {
  if (tmpCoords1 == null) {
   tmpCoords1 = new Coords(3);
  }
  if (tmpCoords2 == null) {
   tmpCoords2 = new Coords(3);
  }
  tmpCoords1.setSub(P.getInhomCoordsInD3(), getCoordSys().getOrigin());
  tmpCoords2.setValues(getDirectionInD3(), 3);
  tmpCoords2.normalize();
  return tmpCoords1.dotproduct(tmpCoords2);
 }
 public double distanceWithSign(GeoPlaneND P) {
  if (tmpCoords1 == null) {
   tmpCoords1 = new Coords(3);
  }
  if (tmpCoords2 == null) {
   tmpCoords2 = new Coords(3);
  }
  tmpCoords2.setValues(getDirectionInD3(), 3);
  tmpCoords2.normalize();
  tmpCoords1.setValues(P.getDirectionInD3(), 3);
  tmpCoords1.normalize();
  if (!DoubleUtil.isEqual(1, Math.abs(tmpCoords1.dotproduct(tmpCoords2)))) {
   return 0;
  }
  tmpCoords1.setSub(P.getCoordSys().getOrigin(), getCoordSys().getOrigin());
  return tmpCoords1.dotproduct(tmpCoords2);
 }
 public void translate(Coords v) {
  getCoordSys().translate(v);
  getCoordSys().translateEquationVector(v);
 }
 public boolean isTranslateable() {
  return true;
 }
 public boolean isTraceable() {
  return true;
 }
 public void setTrace(boolean trace) {
  this.trace = trace;
 }
 public boolean getTrace() {
  return trace;
 }
 public final void rotate(CoordMatrix rot, Coords center) {
  coordsys.rotate(rot, center);
  coordsys.makeEquationVector();
 }
 public final void rotate(NumberValue phiVal) {
  coordsys.rotate(phiVal.getDouble(), Coords.O);
  coordsys.makeEquationVector();
 }
 public final void rotate(NumberValue phiVal, GeoPointND Q) {
  coordsys.rotate(phiVal.getDouble(), Q.getInhomCoordsInD3());
  coordsys.makeEquationVector();
 }
 private void rotate(NumberValue phiVal, Coords center, Coords direction) {
  coordsys.rotate(phiVal.getDouble(), center, direction.normalized());
  coordsys.makeEquationVector();
 }
 public void rotate(NumberValue phiVal, Coords Q, GeoDirectionND orientation) {
  rotate(phiVal, Q, orientation.getDirectionInD3());
 }
 public void mirror(Coords Q) {
  coordsys.mirror(Q);
  coordsys.mirrorEquationVector(Q);
 }
 public void mirror(GeoLineND line) {
  Coords point = line.getStartInhomCoords();
  Coords direction = line.getDirectionInD3().normalized();
  coordsys.mirror(point, direction);
  coordsys.makeEquationVector();
 }
 public void mirror(GeoCoordSys2D plane) {
  coordsys.mirror(plane.getCoordSys());
  coordsys.makeEquationVector();
 }
 public void dilate(NumberValue rval, Coords S) {
  double r = rval.getDouble();
  coordsys.dilate(r, S);
  coordsys.dilateEquationVector(r, S);
 }
 public final HitType getLastHitType() {
  return HitType.ON_FILLING;
 }
 public boolean is6dofMoveable() {
  return true;
 }
 public ValueType getValueType() {
  return ValueType.EQUATION;
 }
 protected void getXMLAnimationTags(final XMLStringBuilder sb) {
 }
 public char getLabelDelimiter() {
  return ':';
 }
 public boolean showLineProperties() {
  return true;
 }
 public int getMinimumLineThickness() {
  return 0;
 }
 public Equation getEquation() {
  return kernel.getAlgebraProcessor().parseEquation(this);
 }
 public boolean isRegion3D() {
  return true;
 }
 public String[] getEquationVariables() {
  ArrayList<String> usedVars = new ArrayList<>();
  if (!MyDouble.exactEqual(getCoordSys().getEquationVector().getX(), 0)) {
   usedVars.add("x");
  }
  if (!MyDouble.exactEqual(getCoordSys().getEquationVector().getY(), 0)) {
   usedVars.add("y");
  }
  if (!MyDouble.exactEqual(getCoordSys().getEquationVector().getZ(), 0)) {
   usedVars.add("z");
  }
  GeoLine.addUsedVars(usedVars, getDefinition());
  return usedVars.toArray(new String[0]);
 }
 public boolean isLaTeXDrawableGeo() {
  return getEquationForm() == Form.USER;
 }
 public boolean setEquationFormFromXML(String style, String parameter) {
  if ("implicit".equals(style)) {
   setToImplicitForm();
  } else if ("user".equals(style)) {
   setToUserForm();
  } else {
   return false;
  }
  return true;
 }
 public void matrixTransform(double a00, double a01, double a10, double a11) {
  matrixTransform(a00, a01, 0, a10, a11, 0, 0, 0, 1);
 }
 public void matrixTransform(
   double a00,
   double a01,
   double a02,
   double a10,
   double a11,
   double a12,
   double a20,
   double a21,
   double a22) {
  CoordMatrix4x4 tmpMatrix4x4 = CoordMatrix4x4.identity();
  tmpMatrix4x4.set(1, 1, a00);
  tmpMatrix4x4.set(1, 2, a01);
  tmpMatrix4x4.set(1, 3, a02);
  tmpMatrix4x4.set(2, 1, a10);
  tmpMatrix4x4.set(2, 2, a11);
  tmpMatrix4x4.set(2, 3, a12);
  tmpMatrix4x4.set(3, 1, a20);
  tmpMatrix4x4.set(3, 2, a21);
  tmpMatrix4x4.set(3, 3, a22);
  coordsys.matrixTransform(tmpMatrix4x4);
  coordsys.makeEquationVector();
 }
 public boolean isMatrixTransformable() {
  return true;
 }
 public void applyToStringModeFrom(GeoElement other) {
  if (other instanceof LinearEquationRepresentable) {
   equationForm = ((LinearEquationRepresentable) other).getEquationForm();
  }
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoPlane3DConstant.java
```java
public class GeoPlane3DConstant extends GeoPlane3D implements SymbolicParametersBotanaAlgo {
 public static final int XOY_PLANE = 1;
 private boolean gridVisible;
 public GeoPlane3DConstant(Construction c, int type) {
  super(c);
  if (type == XOY_PLANE) {
   coordsys.addPoint(Coords.O);
   coordsys.addVector(Coords.VX);
   coordsys.addVector(Coords.VY);
   coordsys.makeOrthoMatrix(false, false);
   coordsys.setEquationVector(0, 0, 1, 0);
   label = "xOyPlane";
   setLabelSet(true);
   setObjColor(GColor.GRAY);
   setLabelVisible(false);
  }
  setFixed(true);
 }
 public boolean isAvailableAtConstructionStep(int step) {
  return true;
 }
 public String toValueString(StringTemplate tpl) {
  return label;
 }
 public String getLabel(StringTemplate tpl) {
  if (tpl.isPrintLocalizedCommandNames()) {
   return getLoc().getMenu(label);
  }
  return label;
 }
 public boolean isTraceable() {
  return false;
 }
 public PVariable[] getBotanaVars(GeoElementND geo) {
  return null;
 }
 public PPolynomial[] getBotanaPolynomials(GeoElementND geo) throws NoSymbolicParametersException {
  return null;
 }
 public boolean isRenameable() {
  return false;
 }
 public boolean is6dofMoveable() {
  return false;
 }
 public boolean showLineProperties() {
  return false;
 }
 public boolean isGridVisible() {
  return gridVisible && isEuclidianVisible();
 }
 public boolean setGridVisible(boolean grid) {
  if (gridVisible == grid) {
   return false;
  }
  gridVisible = grid;
  return true;
 }
 public boolean isProtected(EventType type) {
  return true;
 }
 public boolean isConstant() {
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoPoint3D.java
```java
public class GeoPoint3D extends GeoVec4D
  implements GeoPointND, PathOrPoint, RotatableND, Transformable, MirrorableAtPlane {
 private boolean isInfinite;
 private boolean isDefined;
 private int pointSize;
 private Coords willingCoords = null; 
 private Coords willingDirection = null; 
 private Path path;
 private PathParameter pp;
 private Region region;
 private RegionParameters regionParameters;
 private NumberValue verticalIncrement;
 private double x2D = 0;
 private double y2D = 0;
 private double z2D = 0;
 private Coords inhom = Coords.createInhomCoorsInD3();
 private Coords inhom2D;
 private double zScale = 1;
 private boolean setEuclidianVisibleBySetParentAlgorithm = true;
 private LocateableList locateableList;
 private ArrayList<NumberValue> changeableCoordNumbers = null;
 private boolean hasPolarParentNumbers = false;
 private CoordMatrix4x4 tmpMatrix4x4;
 private Coords tmpCoordsLength3;
 protected int moveMode = MOVE_MODE_TOOL_DEFAULT;
 private Coords moveNormalDirection;
 private boolean showUndefinedInAlgebraView = true;
 private Coords tmpCoords1;
 private Coords tmpCoords2;
 private Coords tmpCoords3;
 private Coords tmpWillingCoords;
 private Coords tmpWillingDirection;
 private Coords tmpCoordsOld;
 private CoordMatrix4x4 m_drawingMatrix = null;
 private ArrayList<GeoElement> incidenceList;
 private boolean trace;
 private double animationValue;
 private ChangeableParent changeableParent = null;
 private boolean hasPolarParentNumbers() {
  return hasPolarParentNumbers;
 }
 public GeoPoint3D(Construction c) {
  super(c);
  setDrawingMatrix(CoordMatrix4x4.identity());
  setCartesian3D();
  setUndefined();
  this.setIncidenceList(null);
 }
 public GeoPoint3D(Construction c, Path path) {
  super(c);
  setDrawingMatrix(CoordMatrix4x4.identity());
  setCartesian3D();
  setPath(path);
 }
 public void setBasicVisualStyle(GeoElement geo) {
  super.setBasicVisualStyle(geo);
  if (geo.isGeoPoint()) {
   setPointSize(((GeoPointND) geo).getPointSize());
   setPointStyle(((GeoPointND) geo).getPointStyle());
  } else if (geo instanceof PointProperties) {
   setPointSize(((PointProperties) geo).getPointSize());
   setPointStyle(((PointProperties) geo).getPointStyle());
  }
 }
 public void setPath(Path path) {
  this.path = path;
 }
 public GeoPoint3D(Construction c, Region region) {
  super(c);
  setDrawingMatrix(CoordMatrix4x4.identity());
  setCartesian3D();
  setRegion(region);
 }
 public void setRegion(Region region) {
  this.region = region;
 }
 public double distance(GeoPointND P) {
  return getInhomCoordsInD3().distance(P.getInhomCoordsInD3());
 }
 public double getX() {
  return getCoords().get(1);
 }
 public double getY() {
  return getCoords().get(2);
 }
 public double getZ() {
  return getCoords().get(3);
 }
 public final void setCoords(Coords v, boolean doPathOrRegion) {
  super.setCoords(v);
  updateCoords();
  if (doPathOrRegion) {
   if (hasRegion()) {
    region.pointChangedForRegion(this);
   }
   if (isPointOnPath()) {
    path.pointChanged(this);
    animationValue = PathNormalizer.toNormalizedPathParameter(
      getPathParameter().t, path.getMinParameter(), path.getMaxParameter());
   }
   updateCoords();
  } else if (isPointOnPath()) {
   animationValue = PathNormalizer.toNormalizedPathParameter(
     getPathParameter().t, path.getMinParameter(), path.getMaxParameter());
  }
 }
 public final void setCoords(Coords v) {
  setCoords(v, true);
 }
 public void setCoordsFromPoint(GeoPointND point) {
  setCoords(point.getInhomCoordsInD3());
 }
 public final void setCoords(double x, double y, double z, double w) {
  setWillingCoordsUndefined();
  setCoords(new Coords(x, y, z, w));
 }
 public final void setCoords(double x, double y, double z) {
  setCoords(x, y, 0, z);
 }
 public final void updateCoords() {
  if (!Double.isNaN(v.getW()) && DoubleUtil.isEpsilon(v.getW(), v.getX(), v.getY(), v.getZ())) {
   isInfinite = true;
   isDefined = !(Double.isNaN(v.get(1)) || Double.isNaN(v.get(2)) || Double.isNaN(v.get(3)));
   inhom.setX(Double.NaN);
   inhom.setY(Double.NaN);
   inhom.setZ(Double.NaN);
  }
  else {
   isInfinite = false;
   isDefined = v.isDefined();
   if (isDefined) {
    if (v.get(4) < 0) {
     for (int i = 1; i <= 4; i++) {
      v.set(i, v.get(i) * -1.0);
     }
    }
    if (v.get(4) == 1.0) {
     inhom.set(1, v.get(1));
     inhom.set(2, v.get(2));
     inhom.set(3, v.get(3));
    } else {
     inhom.set(1, v.get(1) / v.get(4));
     inhom.set(2, v.get(2) / v.get(4));
     inhom.set(3, v.get(3) / v.get(4));
    }
   } else {
    inhom.setX(Double.NaN);
    inhom.setY(Double.NaN);
    inhom.setZ(Double.NaN);
   }
  }
  getDrawingMatrix().setOrigin(getCoords());
 }
 public final void setCoords(GeoVec3D v) {
  setCoords(v.x, v.y, v.z, 1.0);
 }
 public final Coords getInhomCoords() {
  return inhom;
 }
 public Coords getInhomCoordsInD(int dimension) {
  switch (dimension) {
   case 3:
    return getInhomCoordsInD3();
   case 2:
    return getInhomCoordsInD2();
   default:
    return null;
  }
 }
 public Coords getInhomCoordsInD2() {
  if (inhom2D == null) {
   inhom2D = new Coords(2);
  }
  inhom2D.setX(inhom.getX());
  inhom2D.setY(inhom.getY());
  return inhom2D;
 }
 public Coords getInhomCoordsInD3() {
  return inhom;
 }
 public final double getInhomX() {
  return inhom.getX();
 }
 public final double getInhomY() {
  return inhom.getY();
 }
 public final double getInhomZ() {
  return inhom.getZ();
 }
 public Coords getCoordsInD2IfInPlane(CoordSys coordSys) {
  return getCoordsInD2IfInPlane(coordSys, false);
 }
 public Coords getCoordsInD2IfInPlaneInRealCoords(CoordSys coordSys) {
  return getCoordsInD2IfInPlane(coordSys, true);
 }
 private Coords getCoordsInD2IfInPlane(CoordSys coordSys, boolean forceRealCoords) {
  if (setCoords2D(coordSys, forceRealCoords)) {
   return tmpCoordsLength3;
  }
  return null;
 }
 public Coords getCoordsInD2(CoordSys coordSys) {
  setCoords2D(coordSys, false);
  return tmpCoordsLength3;
 }
 private boolean setCoords2D(CoordSys coordSys, boolean forceRealCoords) {
  Coords coords;
  if (tmpCoords1 == null) {
   tmpCoords1 = Coords.createInhomCoorsInD3();
  }
  if (hasWillingCoords() && !forceRealCoords) {
   coords = getWillingCoords();
  } else {
   coords = getCoords();
  }
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  if (coordSys == null) { 
   CoordMatrix4x4.identity(tmpMatrix4x4);
  } else {
   tmpMatrix4x4.set(coordSys.getMatrixOrthonormal());
  }
  if (!hasWillingDirection()) {
   coords.projectPlaneInPlaneCoords(tmpMatrix4x4, tmpCoords1);
  } else {
   coords.projectPlaneThruVIfPossibleInPlaneCoords(
     tmpMatrix4x4, getWillingDirection(), tmpCoords1);
  }
  if (tmpCoordsLength3 == null) {
   tmpCoordsLength3 = new Coords(3);
  }
  double w = tmpCoords1.getW();
  tmpCoordsLength3.setX(tmpCoords1.getX() / w);
  tmpCoordsLength3.setY(tmpCoords1.getY() / w);
  tmpCoordsLength3.setZ(1);
  return DoubleUtil.isZero(tmpCoords1.getZ());
 }
 public Coords getCoordsInD(int dimension) {
  switch (dimension) {
   case 3:
    return getCoords();
   case 2:
    return getCoordsInD2();
   default:
    return null;
  }
 }
 public Coords getCoordsInD2() {
  return getCoordsInD2(CoordSys.Identity3D);
 }
 public Coords getCoordsInD3() {
  return getCoords();
 }
 public final void getInhomCoords(double[] d) {
  double[] coords = getInhomCoords().get();
  System.arraycopy(coords, 0, d, 0, d.length);
 }
 public final double[] vectorTo(GeoPointND QI) {
  GeoPoint3D Q = (GeoPoint3D) QI;
  return Q.getCoords().sub(getCoords()).get();
 }
 public boolean movePoint(Coords rwTransVec, Coords endPosition) {
  boolean movedGeo = false;
  if (endPosition == null) {
   Coords coords;
   Coords current = getInhomCoords();
   if (current.getLength() < rwTransVec.getLength()) {
    coords = current.add(rwTransVec);
   } else {
    coords = current.addSmaller(rwTransVec);
   }
   Coords oldCoords = getCoords().copy();
   setCoords(coords);
   movedGeo = !oldCoords.isEqual(getCoords());
  }
  return movedGeo;
 }
 public final boolean isPointOnPath() {
  return path != null;
 }
 public Path getPath() {
  return path;
 }
 public final PathParameter getPathParameter() {
  if (pp == null) {
   pp = new PathParameter(0);
  }
  return pp;
 }
 public final void doPath() {
  path.pointChanged(this);
  if (!(path.toGeoElement().isGeoElement3D() || path.toGeoElement().isGeoList())) {
   updateCoordsFrom2D(false, null);
  }
  updateCoords();
 }
 public boolean isPointerChangeable() {
  return GeoPoint.isPointChangeable(this);
 }
 public final boolean hasRegion() {
  return region != null;
 }
 public final boolean isPointInRegion() {
  return region != null;
 }
 public final void doRegion() {
  region.pointChangedForRegion(this);
  updateCoords();
 }
 public final RegionParameters getRegionParameters() {
  if (regionParameters == null) {
   regionParameters = new RegionParameters();
  }
  return regionParameters;
 }
 public final Region getRegion() {
  return region;
 }
 public void updateCoords2D() {
  if (region != null) { 
   updateCoords2D(region, true);
  } else { 
   x2D = getX();
   y2D = getY();
   z2D = getZ();
  }
 }
 public void updateCoords2D(Region reg, boolean updateParameters) {
  Coords coords;
  Coords[] project;
  if (!(reg instanceof Region3D)) {
   Log.warn(reg + " is not 3D region");
   return;
  }
  if (hasWillingCoords()) {
   coords = getWillingCoords();
  } else {
   coords = getCoords();
  }
  if (!hasWillingDirection()) { 
   project = ((Region3D) reg).getNormalProjection(coords);
  } else { 
   project = ((Region3D) reg).getProjection(getCoords(), coords, getWillingDirection());
  }
  x2D = project[1].get(1);
  y2D = project[1].get(2);
  z2D = project[1].get(3);
  if (updateParameters) {
   RegionParameters rp = getRegionParameters();
   rp.setT1(project[1].get(1));
   rp.setT2(project[1].get(2));
   rp.setNormal(reg.getMainDirection());
  }
 }
 public void setCoords2D(double x, double y, double z) {
  x2D = x / z;
  y2D = y / z;
 }
 public double getX2D() {
  return x2D;
 }
 public double getY2D() {
  return y2D;
 }
 public double getZ2D() {
  return z2D;
 }
 public void updateCoordsFrom2D(boolean doPathOrRegion, CoordSys coordsys) {
  if (coordsys != null) {
   setCoords(coordsys.getPoint(getX2D(), getY2D()), doPathOrRegion);
  } else if (region != null) {
   setCoords(((Region3D) region).getPoint(getX2D(), getY2D(), new Coords(4)), doPathOrRegion);
  } else {
   setCoords(new Coords(getX2D(), getY2D(), 0, 1), doPathOrRegion);
  }
 }
 public void updateCoordsFrom2D(boolean doPathOrRegion) {
  updateCoordsFrom2D(doPathOrRegion, CoordSys.Identity3D);
 }
 public void setWillingCoords(Coords willingCoords) {
  if (this.willingCoords == null) {
   this.willingCoords = Coords.createInhomCoorsInD3();
  }
  if (willingCoords == null || !willingCoords.isDefined()) {
   this.willingCoords.setUndefined();
  } else {
   this.willingCoords.set(willingCoords);
  }
 }
 public void setWillingCoordsUndefined() {
  if (this.willingCoords == null) {
   this.willingCoords = Coords.createInhomCoorsInD3();
  }
  this.willingCoords.setUndefined();
 }
 public void setWillingCoords(double x, double y, double z, double w) {
  if (this.willingCoords == null) {
   this.willingCoords = Coords.createInhomCoorsInD3();
  }
  willingCoords.setX(x);
  willingCoords.setY(y);
  willingCoords.setZ(z);
  willingCoords.setW(w);
 }
 public void setWillingDirection(Coords willingDirection) {
  if (this.willingDirection == null) {
   this.willingDirection = new Coords(4);
  }
  if (willingDirection == null || !willingDirection.isDefined()) {
   this.willingDirection.setUndefined();
  } else {
   this.willingDirection.set(willingDirection);
  }
 }
 public void setWillingDirectionUndefined() {
  if (this.willingDirection == null) {
   this.willingDirection = new Coords(4);
  }
  this.willingDirection.setUndefined();
 }
 public Coords getWillingCoords() {
  return willingCoords;
 }
 public boolean hasWillingCoords() {
  return willingCoords != null && willingCoords.isDefined();
 }
 public Coords getWillingDirection() {
  return willingDirection;
 }
 public boolean hasWillingDirection() {
  return willingDirection != null && willingDirection.isDefined();
 }
 public void setZScale(double scale) {
  zScale = scale;
 }
 public double getZScale() {
  return zScale;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.POINT3D;
 }
 public GeoPoint3D(GeoPointND point) {
  super(point.getConstruction());
  setDrawingMatrix(CoordMatrix4x4.identity());
  set(point);
 }
 public GeoPoint3D copy() {
  return new GeoPoint3D(this);
 }
 public final boolean isGeoPoint() {
  return true;
 }
 public boolean isDefined() {
  return isDefined;
 }
 public void set(GeoElementND geo) {
  set(geo, true);
 }
 public void set(GeoElementND geo, boolean macroFeedback) {
  if (geo.isGeoPoint()) {
   GeoPointND p = (GeoPointND) geo;
   if (p.getPathParameter() != null) {
    PathParameter pathParameter = getPathParameter();
    pathParameter.set(p.getPathParameter());
   }
   animationValue = p.getAnimationValue();
   setCoords(p);
   updateCoords();
   setMode(p.getToStringMode()); 
   reuseDefinition(geo);
  } else {
   setUndefined();
  }
 }
 public void setUndefined() {
  setCoords(new Coords(Double.NaN, Double.NaN, Double.NaN, Double.NaN), false);
  setWillingCoordsUndefined();
  isDefined = false;
  isInfinite = false;
 }
 public boolean showInEuclidianView() {
  return isDefined && !isInfinite;
 }
 public final String toString(StringTemplate tpl) {
  return label
    + GeoPoint.getEqualSign(getToStringMode(), tpl.getCoordStyle(kernel.getCoordStyle()), tpl)
    + toValueString(tpl);
 }
 public String toValueString(StringTemplate tpl) {
  if (isInfinite()) {
   return "?";
  }
  if (tpl.hasCASType() && getDefinition() != null) {
   return getDefinition().toValueString(tpl);
  }
  StringBuilder sbToString = getSbBuildValueString();
  Coords p = getInhomCoordsInD3();
  if (getToStringMode() == Kernel.COORD_CARTESIAN_3D) {
   GeoPoint.buildValueStringCoordCartesian3D(
     kernel, tpl, p.getX(), p.getY(), p.getZ(), sbToString);
  } else if (getToStringMode() == Kernel.COORD_SPHERICAL) {
   GeoPoint.buildValueStringCoordSpherical(
     kernel, tpl, p.getX(), p.getY(), p.getZ(), sbToString);
  } else if (!DoubleUtil.isZero(p.getZ())) {
   if (getToStringMode() == Kernel.COORD_POLAR) {
    GeoPoint.buildValueStringCoordSpherical(
      kernel, tpl, p.getX(), p.getY(), p.getZ(), sbToString);
   } else {
    GeoPoint.buildValueStringCoordCartesian3D(
      kernel, tpl, p.getX(), p.getY(), p.getZ(), sbToString);
   }
  } else {
   GeoPoint.buildValueString(kernel, tpl, getToStringMode(), p.getX(), p.getY(), sbToString);
  }
  return sbToString.toString();
 }
 public ExtendedBoolean isEqualExtended(GeoElementND geo) {
  if (!geo.isGeoPoint()) {
   return ExtendedBoolean.FALSE;
  }
  return ExtendedBoolean.newExtendedBoolean(isEqualPointND((GeoPointND) geo));
 }
 public boolean isEqualPointND(GeoPointND P) {
  if (!(isDefined() && P.isDefined())) {
   return false;
  }
  if (isFinite() && P.isFinite()) {
   Coords c1 = getInhomCoords();
   Coords c2 = P.getInhomCoordsInD3();
   return DoubleUtil.isEqual(c1.getX(), c2.getX())
     && DoubleUtil.isEqual(c1.getY(), c2.getY())
     && DoubleUtil.isEqual(c1.getZ(), c2.getZ());
  } else if (isInfinite() && P.isInfinite()) {
   Coords c1 = getCoords();
   Coords c2 = P.getCoordsInD3();
   return c1.crossProduct(c2).equalsForKernel(0, Kernel.STANDARD_PRECISION);
  } else {
   return false;
  }
 }
 public int getPointSize() {
  return pointSize;
 }
 public int getPointStyle() {
  return 0;
 }
 public void setPointSize(int size) {
  pointSize = size;
 }
 public void setPointStyle(int type) {
 }
 protected void getStyleXML(XMLStringBuilder sb) {
  super.getStyleXML(sb);
  switch (getToStringMode()) {
   case Kernel.COORD_POLAR:
    coordStyle(sb, "polar");
    break;
   case Kernel.COORD_COMPLEX:
    coordStyle(sb, "complex");
    break;
   case Kernel.COORD_CARTESIAN:
    coordStyle(sb, "cartesian");
    break;
   case Kernel.COORD_SPHERICAL:
    coordStyle(sb, "spherical");
    break;
   default:
  }
  sb.startTag("pointSize").attr("val", pointSize).endTag();
  if (verticalIncrement != null) {
   XMLBuilder.appendVerticalIncrement(sb, verticalIncrement);
  }
 }
 public void appendStartPointXML(XMLStringBuilder sb, boolean absolute) {
  sb.startTag("startPoint");
  if (isAbsoluteStartPoint()) {
   sb.attr("x", getCoords().get(1));
   sb.attr("y", getCoords().get(2));
   sb.attr("z", getCoords().get(3));
   sb.attr("w", getCoords().get(4));
  } else {
   sb.attr("exp", getLabel(StringTemplate.xmlTemplate));
  }
  sb.endTag();
 }
 public final boolean isAbsoluteStartPoint() {
  return isIndependent() && !isLabelSet();
 }
 public LocateableList getLocateableList() {
  if (locateableList == null) {
   locateableList = new LocateableList(this);
  }
  return locateableList;
 }
 public boolean hasLocateableList() {
  return locateableList != null;
 }
 public void setLocateableList(LocateableList locateableList) {
  this.locateableList = locateableList;
 }
 public void doRemove() {
  if (locateableList != null) {
   locateableList.doRemove();
  }
  super.doRemove();
 }
 public void update(boolean drag) {
  super.update(drag);
  if (locateableList != null) {
   GeoElement.updateCascadeLocation(locateableList, cons);
  }
 }
 public boolean isFinite() {
  return isDefined && !isInfinite;
 }
 public boolean isInfinite() {
  return isInfinite;
 }
 public double[] getPointAsDouble() {
  return getInhomCoords().get();
 }
 public Geo3DVec getVector() {
  return new Geo3DVec(kernel, getX(), getY(), getZ());
 }
 public Coords getLabelPosition() {
  return getInhomCoordsInD3();
 }
 public void switchMoveMode(int mode) {
  switch (moveMode) {
   case MOVE_MODE_XY:
    moveMode = MOVE_MODE_Z;
    break;
   case MOVE_MODE_Z:
    moveMode = MOVE_MODE_XY;
    break;
   case MOVE_MODE_TOOL_DEFAULT:
    if (mode == EuclidianConstants.MODE_MOVE) {
     moveMode = MOVE_MODE_Z;
    } else {
     moveMode = MOVE_MODE_XY;
    }
    break;
   default:
    break;
  }
 }
 public void setMoveMode(int flag) {
  moveMode = flag;
 }
 public int getMoveMode() {
  if (changeableParent != null) {
   return MOVE_MODE_NONE;
  }
  if (this.hasChangeableCoordParentNumbers()) {
   return moveMode;
  }
  if (!isIndependent()) {
   AlgoElement algo = getParentAlgorithm();
   if (algo instanceof AlgoDynamicCoordinates3D) {
    return moveMode;
   }
   return MOVE_MODE_NONE;
  }
  if (isLocked()) {
   return MOVE_MODE_NONE;
  }
  if (isPointOnPath()) {
   return MOVE_MODE_NONE; 
  }
  if (hasRegion()) {
   GeoElement geo = (GeoElement) region;
   if (geo.isGeoQuadric()
     && ((GeoQuadric3D) geo).getType() == GeoQuadricNDConstants.QUADRIC_LINE) {
    return MOVE_MODE_NONE;
   }
   return MOVE_MODE_XY;
  }
  return moveMode;
 }
 public int getRealMoveMode() {
  return moveMode;
 }
 public void setMoveNormalDirection(Coords d) {
  moveNormalDirection = d.copyVector();
 }
 public Coords getMoveNormalDirection() {
  return moveNormalDirection;
 }
 public void showUndefinedInAlgebraView(boolean flag) {
  showUndefinedInAlgebraView = flag;
 }
 public final boolean showInAlgebraView() {
  return isDefined || showUndefinedInAlgebraView;
 }
 public void setParentAlgorithm(AlgoElement algorithm) {
  super.setParentAlgorithm(algorithm);
  if (algorithm != null) {
   setConstructionDefaults(setEuclidianVisibleBySetParentAlgorithm, false);
  }
 }
 public void dontSetEuclidianVisibleBySetParentAlgorithm() {
  setEuclidianVisibleBySetParentAlgorithm = false;
 }
 public void updateColumnHeadingsForTraceValues() {
  resetSpreadsheetColumnHeadings();
  spreadsheetColumnHeadings.add(getColumnHeadingText(new ExpressionNode(
    kernel,
    kernel.getAlgebraProcessor().getXBracket(), 
    Operation.PLUS,
    new ExpressionNode(
      kernel,
      getNameGeo(), 
      Operation.PLUS,
      kernel.getAlgebraProcessor().getCloseBracket())))); 
  spreadsheetColumnHeadings.add(getColumnHeadingText(new ExpressionNode(
    kernel,
    kernel.getAlgebraProcessor().getYBracket(), 
    Operation.PLUS,
    new ExpressionNode(
      kernel,
      getNameGeo(), 
      Operation.PLUS,
      kernel.getAlgebraProcessor().getCloseBracket())))); 
  spreadsheetColumnHeadings.add(getColumnHeadingText(new ExpressionNode(
    kernel,
    kernel.getAlgebraProcessor().getZBracket(), 
    Operation.PLUS,
    new ExpressionNode(
      kernel,
      getNameGeo(), 
      Operation.PLUS,
      kernel.getAlgebraProcessor().getCloseBracket())))); 
 }
 public TraceModesEnum getTraceModes() {
  return TraceModesEnum.SEVERAL_VALUES_OR_COPY;
 }
 public String getTraceDialogAsValues() {
  String name = getLabelTextOrHTML(false);
  return "x(" + name + "), y(" + name + "), z(" + name + ")";
 }
 public void addToSpreadsheetTraceList(ArrayList<GeoNumeric> spreadsheetTraceList) {
  GeoNumeric xx = new GeoNumeric(cons, inhom.getX());
  spreadsheetTraceList.add(xx);
  GeoNumeric yy = new GeoNumeric(cons, inhom.getY());
  spreadsheetTraceList.add(yy);
  GeoNumeric zz = new GeoNumeric(cons, inhom.getZ());
  spreadsheetTraceList.add(zz);
 }
 public void matrixTransform(double a, double b, double c, double d) {
  double x = getX();
  double y = getY();
  double x1 = a * x + b * y;
  double y1 = c * x + d * y;
  setCoords(x1, y1, getZ(), getW());
 }
 public void matrixTransform(
   double a00,
   double a01,
   double a02,
   double a10,
   double a11,
   double a12,
   double a20,
   double a21,
   double a22) {
  double x = getX();
  double y = getY();
  double z = getZ();
  double x1 = a00 * x + a01 * y + a02 * z;
  double y1 = a10 * x + a11 * y + a12 * z;
  double z1 = a20 * x + a21 * y + a22 * z;
  setCoords(x1, y1, z1, getW());
 }
 public boolean isMatrixTransformable() {
  return true;
 }
 public int getDimension() {
  return 3;
 }
 public final boolean isCasEvaluableObject() {
  return true;
 }
 public void setCartesian() {
  setMode(Kernel.COORD_CARTESIAN);
 }
 public void setCartesian3D() {
  setMode(Kernel.COORD_CARTESIAN_3D);
 }
 public void setSpherical() {
  setMode(Kernel.COORD_SPHERICAL);
 }
 public void setPolar() {
  setMode(Kernel.COORD_POLAR);
 }
 public void setComplex() {
  setMode(Kernel.COORD_COMPLEX);
 }
 public final void rotate(NumberValue phiValue) {
  double phi = phiValue.getDouble();
  double cos = Math.cos(phi);
  double sin = Math.sin(phi);
  double x = getX();
  double y = getY();
  double z = getZ();
  setCoords(x * cos - y * sin, x * sin + y * cos, z, getW());
 }
 public final void rotate(NumberValue phiValue, GeoPointND point) {
  rotate(phiValue, point.getInhomCoords());
 }
 public final void rotate(NumberValue phiValue, Coords point) {
  double phi = phiValue.getDouble();
  double cos = Math.cos(phi);
  double sin = Math.sin(phi);
  double x = getX();
  double y = getY();
  double z = getZ();
  double w = getW();
  double qx = w * point.getX();
  double qy = w * point.getY();
  setCoords((x - qx) * cos + (qy - y) * sin + qx, (x - qx) * sin + (y - qy) * cos + qy, z, w);
 }
 public void rotate(NumberValue phiValue, Coords S, GeoDirectionND orientation) {
  Coords vn = orientation.getDirectionInD3();
  rotate(phiValue, S, vn);
 }
 private void rotate(NumberValue phiValue, Coords o1, Coords vn) {
  rotate(phiValue.getDouble(), o1, vn);
 }
 public void rotate(double phi, Coords o1, Coords vn) {
  if (vn.isZero() || Double.isNaN(phi)) {
   setUndefined();
   return;
  }
  Coords point = getInhomCoordsInD3();
  if (tmpCoords1 == null) {
   tmpCoords1 = Coords.createInhomCoorsInD3();
  }
  point.projectLine(o1, vn, tmpCoords1, null); 
  if (tmpCoords2 == null) {
   tmpCoords2 = new Coords(4);
  }
  tmpCoords2.setSub(point, tmpCoords1);
  double cos = Math.cos(phi);
  double sin = Math.sin(phi);
  double l = vn.calcNorm();
  if (tmpCoords3 == null) {
   tmpCoords3 = new Coords(4);
  }
  tmpCoords3.setCrossProduct4(vn, tmpCoords2);
  setCoords(tmpCoords1.setAdd(
    tmpCoords1, tmpCoords2.setAdd(tmpCoords2.mulInside(cos), tmpCoords3.mulInside(sin / l))));
 }
 public void rotate(double phi, GeoLineND line) {
  Coords o1 = line.getStartInhomCoords();
  Coords vn = line.getDirectionInD3();
  rotate(phi, o1, vn);
 }
 public void pointChanged(GeoPointND p) {
  if (p.isGeoElement3D()) {
   p.setCoords(this.getCoords(), false);
  } else {
   Coords coords = this.getCoords();
   if (!DoubleUtil.isZero(coords.getZ())) {
    p.setUndefined();
   } else {
    GeoPoint.pointChanged(p, coords.getX(), coords.getY(), coords.getW());
   }
  }
  p.getPathParameter().setT(0);
 }
 public void pathChanged(GeoPointND PI) {
  pointChanged(PI);
 }
 public boolean isOnPath(GeoPointND PI, double eps) {
  return isEqual(PI);
 }
 public double getMinParameter() {
  return 0;
 }
 public double getMaxParameter() {
  return 0;
 }
 public boolean isClosedPath() {
  return false;
 }
 public double distanceToPath(PathOrPoint path1) {
  if (tmpCoordsOld == null) {
   tmpCoordsOld = new Coords(4);
  }
  tmpCoordsOld.set(getInhomCoords());
  if (tmpWillingCoords == null) {
   tmpWillingCoords = Coords.createInhomCoorsInD3();
  }
  if (tmpWillingDirection == null) {
   tmpWillingDirection = new Coords(4);
  }
  boolean hadWillingCoords;
  if (hasWillingCoords()) {
   hadWillingCoords = true;
   tmpWillingCoords.set(getWillingCoords());
  } else {
   hadWillingCoords = false;
   tmpWillingCoords.set(tmpCoordsOld);
  }
  if (hasWillingDirection()) {
   tmpWillingDirection.set(getWillingDirection());
  } else {
   tmpWillingDirection.setUndefined();
  }
  path1.pointChanged(this);
  double d;
  if (!tmpWillingDirection.isDefined()) {
   d = getInhomCoords().distance(tmpWillingCoords);
  } else {
   d = getInhomCoords().distLine(tmpWillingCoords, tmpWillingDirection);
   setWillingDirection(tmpWillingDirection);
  }
  if (hadWillingCoords) {
   setWillingCoords(tmpWillingCoords);
  }
  setCoords(tmpCoordsOld, false);
  return d;
 }
 public CoordMatrix4x4 getDrawingMatrix() {
  return m_drawingMatrix;
 }
 public void setDrawingMatrix(CoordMatrix4x4 a_drawingMatrix) {
  this.m_drawingMatrix = a_drawingMatrix;
 }
 public boolean isTraceable() {
  return true;
 }
 public void setTrace(boolean trace) {
  this.trace = trace;
 }
 public boolean getTrace() {
  return trace;
 }
 public void mirror(Coords Q) {
  double w = getW();
  double qx = w * Q.getX();
  double qy = w * Q.getY();
  double qz = w * Q.getZ();
  setCoords(2.0 * qx - getX(), 2.0 * qy - getY(), 2.0 * qz - getZ(), w);
 }
 public void mirror(GeoLineND line) {
  Coords o1 = line.getStartInhomCoords();
  Coords vn = line.getDirectionInD3();
  Coords point = getInhomCoordsInD3();
  if (tmpCoords1 == null) {
   tmpCoords1 = Coords.createInhomCoorsInD3();
  }
  point.projectLine(o1, vn, tmpCoords1, null); 
  mirror(tmpCoords1);
 }
 public void mirror(GeoCoordSys2D plane) {
  if (tmpCoords1 == null) {
   tmpCoords1 = Coords.createInhomCoorsInD3();
  }
  getInhomCoordsInD3().projectPlane(plane.getCoordSys().getMatrixOrthonormal(), tmpCoords1);
  mirror(tmpCoords1);
 }
 public void dilate(NumberValue rval, Coords S) {
  double r = rval.getDouble();
  double temp = 1 - r;
  double w = getW();
  setCoords(
    r * getX() + temp * S.getX() * w,
    r * getY() + temp * S.getY() * w,
    r * getZ() + temp * S.getZ() * w,
    w);
 }
 public ArrayList<GeoElement> getIncidenceList() {
  return incidenceList;
 }
 public void setIncidenceList(ArrayList<GeoElement> list) {
  if (list == null) {
   incidenceList = new ArrayList<>();
  } else {
   incidenceList = new ArrayList<>(list);
  }
 }
 public void createIncidenceList() {
  incidenceList = new ArrayList<>();
 }
 public void addIncidence(GeoElement geo, boolean isStartPoint) {
  if (incidenceList == null) {
   createIncidenceList();
  }
  if (!incidenceList.contains(geo)) {
   incidenceList.add(geo);
  }
  if (geo.isGeoConic()) {
   ((GeoConicND) geo).addPointOnConic(this);
  } else if (geo.isGeoLine() && !isStartPoint) {
   ((GeoLineND) geo).addPointOnLine(this);
  }
 }
 public final void removeIncidence(GeoElement geo) {
  if (incidenceList != null) {
   incidenceList.remove(geo);
  }
  if (geo.isGeoConic()) {
   ((GeoConicND) geo).removePointOnConic(this);
  } else if (geo.isGeoLine()) {
   ((GeoLineND) geo).removePointOnLine(this);
  }
 }
 public boolean evaluatesTo3DVector() {
  return true;
 }
 public void set(double param1, double param2, MyPoint leftPoint, MyPoint rightPoint) {
  setCoords(
    new Coords(
      param2 * leftPoint.x + param1 * rightPoint.x,
      param2 * leftPoint.y + param1 * rightPoint.y,
      param2 * leftPoint.getZ() + param1 * rightPoint.getZ(),
      1.0),
    false);
  updateCoords();
 }
 public void translate(Coords v0) {
  if (tmpCoords2 == null) {
   tmpCoords2 = new Coords(4);
  }
  tmpCoords2.setMul(v0, v.getW());
  v.addInside(tmpCoords2);
  setCoords(v);
 }
 public GeoElementND doAnimationStep(double frameRate, GeoList parent) {
  return GeoPoint.doAnimationStep(frameRate, this, path, parent);
 }
 public boolean isAnimatable() {
  return isPointOnPath() && isPointerChangeable();
 }
 public double getAnimationValue() {
  return animationValue;
 }
 public void setAnimationValue(double val) {
  animationValue = val;
 }
 public ValueType getValueType() {
  return ValueType.VECTOR3D;
 }
 public ValidExpression toValidExpression() {
  return getVector();
 }
 public void removePath() {
  path = null;
  pp = null;
 }
 public final ArrayList<NumberValue> getCoordParentNumbers() {
  if (changeableCoordNumbers == null) {
   changeableCoordNumbers = new ArrayList<>(3);
   AlgoElement parentAlgo = getParentAlgorithm();
   if (parentAlgo instanceof AlgoDependentPoint3D) {
    AlgoDependentPoint3D algo = (AlgoDependentPoint3D) parentAlgo;
    ExpressionNode en = algo.getExpression();
    if (en.isLeaf() && en.getLeft() instanceof MyVec3DNode) {
     MyVec3DNode vn = (MyVec3DNode) en.getLeft();
     hasPolarParentNumbers = vn.getToStringMode() == Kernel.COORD_SPHERICAL
       || vn.getToStringMode() == Kernel.COORD_POLAR;
     try {
      ExpressionValue xcoord = vn.getX();
      ExpressionValue ycoord = vn.getY();
      ExpressionValue zcoord = vn.getZ();
      ParametricProcessor proc = kernel.getAlgebraProcessor().getParamProcessor();
      NumberValue xNum = proc.getCoordNumber(xcoord);
      NumberValue yNum = proc.getCoordNumber(ycoord);
      NumberValue zNum = proc.getCoordNumber(zcoord);
      addChangeableCoordOrNull(xNum);
      addChangeableCoordOrNull(yNum);
      addChangeableCoordOrNull(zNum);
     } catch (Throwable e) {
      changeableCoordNumbers.clear();
      Log.debug(e);
     }
    }
   }
  }
  return changeableCoordNumbers;
 }
 private void addChangeableCoordOrNull(NumberValue xNum) {
  if (xNum instanceof GeoNumeric && ((GeoNumeric) xNum).isPointerChangeable()) {
   changeableCoordNumbers.add(xNum);
  } else {
   changeableCoordNumbers.add(null);
  }
 }
 public final void setChangeableParentIfNull(ChangeableParent cp) {
  if (changeableParent == null) {
   changeableParent = cp;
  }
 }
 public boolean hasChangeableParent3D() {
  if (isLocked()) {
   return false;
  }
  return changeableParent != null;
 }
 public ChangeableParent getChangeableParent3D() {
  return changeableParent;
 }
 public final boolean hasChangeableCoordParentNumbers() {
  if (isLocked()) {
   return false;
  }
  ArrayList<NumberValue> coords = getCoordParentNumbers();
  if (coords.size() == 0) {
   return false;
  }
  NumberValue num1 = coords.get(0);
  NumberValue num2 = coords.get(1);
  if (num1 == null && num2 == null) {
   return false;
  }
  if (num1 instanceof GeoNumeric && num2 instanceof GeoNumeric) {
   GeoElement maxObj1 = GeoElement.as(((GeoNumeric) num1).getIntervalMaxObject());
   GeoElement maxObj2 = GeoElement.as(((GeoNumeric) num2).getIntervalMaxObject());
   GeoElement minObj1 = GeoElement.as(((GeoNumeric) num1).getIntervalMinObject());
   GeoElement minObj2 = GeoElement.as(((GeoNumeric) num2).getIntervalMinObject());
   if (maxObj1 != null && maxObj1.isChildOrEqual((GeoElement) num2)) {
    return false;
   }
   if (minObj1 != null && minObj1.isChildOrEqual((GeoElement) num2)) {
    return false;
   }
   if (maxObj2 != null && maxObj2.isChildOrEqual((GeoElement) num1)) {
    return false;
   }
   if (minObj2 != null && minObj2.isChildOrEqual((GeoElement) num1)) {
    return false;
   }
  }
  return (num1 instanceof GeoNumeric && ((GeoNumeric) num1).isPointerChangeable())
    || (num2 instanceof GeoNumeric && ((GeoNumeric) num2).isPointerChangeable());
 }
 public boolean moveFromChangeableCoordParentNumbers(
   Coords rwTransVec,
   Coords targetPosition,
   ArrayList<GeoElement> updateGeos,
   ArrayList<GeoElement> tempMoveObjectList) {
  if (!hasChangeableCoordParentNumbers()) {
   return false;
  }
  Coords endPosition = targetPosition;
  if (endPosition == null) {
   endPosition = getInhomCoords().add(rwTransVec);
  }
  ArrayList<NumberValue> freeCoordNumbers = getCoordParentNumbers();
  NumberValue xvar = freeCoordNumbers.get(0);
  NumberValue yvar = freeCoordNumbers.get(1);
  NumberValue zvar = freeCoordNumbers.get(2);
  if (!hasPolarParentNumbers()) {
   if (xvar instanceof GeoNumeric) {
    GeoPoint.incrementParentNumeric(
      endPosition.getX() - getInhomX(), (GeoNumeric) xvar, targetPosition);
   }
   if (xvar != yvar && yvar instanceof GeoNumeric) {
    GeoPoint.incrementParentNumeric(
      endPosition.getY() - getInhomY(), (GeoNumeric) yvar, targetPosition);
   }
   if (zvar != yvar && zvar != xvar && zvar instanceof GeoNumeric) {
    GeoPoint.incrementParentNumeric(
      endPosition.getZ() - getInhomZ(), (GeoNumeric) zvar, targetPosition);
   }
  }
  if (xvar instanceof GeoNumeric) {
   addParentToUpdateList((GeoNumeric) xvar, updateGeos, tempMoveObjectList);
  }
  if (yvar instanceof GeoNumeric) {
   addParentToUpdateList((GeoNumeric) yvar, updateGeos, tempMoveObjectList);
  }
  if (zvar instanceof GeoNumeric) {
   addParentToUpdateList((GeoNumeric) zvar, updateGeos, tempMoveObjectList);
  }
  return true;
 }
 public final String toStringDescription(StringTemplate tpl) {
  boolean isAvDescrip =
    AlgebraStyle.DESCRIPTION == getApp().getSettings().getAlgebra().getStyle();
  if (isAvDescrip) {
   return getKernel().getLocalization().getMenu("Point") + " " + label;
  }
  return toString(tpl);
 }
 public boolean isWhollyIn2DView(EuclidianView ev) {
  return DoubleUtil.isZero(inhom.getZ());
 }
 public boolean addToPathParameter(double increment) {
  PathParameter parameter = getPathParameter();
  if (path.cannotAdd(parameter, increment)) {
   return false;
  }
  parameter.t += increment;
  path.pathChanged(this);
  updateCoords();
  path.pointChanged(this);
  return true;
 }
 public void updatePathParameter(double t) {
  PathParameter parameter = getPathParameter();
  parameter.t = t;
  path.pathChanged(this);
  updateCoords();
  path.pointChanged(this);
 }
 public void addAuralOperations(Localization loc, ScreenReaderBuilder sb) {
  GeoPoint.addAuralArrows(loc, sb, this);
  super.addAuralOperations(loc, sb);
 }
 public String getAuralTextForMove() {
  return GeoPoint.pointMovedAural(kernel.getLocalization(), this);
 }
 public boolean showPointProperties() {
  return true;
 }
 public void setRegionChanged(double x, double y) {
  setCoords2D(x, y, 1);
  updateCoordsFrom2D(false, null);
 }
 public void pointChanged(GeoPolygon polygon) {
  Coords coordsOld = getInhomCoords().copyVector();
  final Region oldRegion = getRegion();
  setRegion(null);
  double minDist = Double.POSITIVE_INFINITY;
  Coords res = null;
  double param = 0;
  GeoSegment3D segment = null;
  GeoSegmentND[] segments = polygon.getSegments();
  if (segments == null || segments.length < polygon.getPointsLength()) {
   segment = new GeoSegment3D(cons);
  }
  for (int i = 0; i < polygon.getPointsLength(); i++) {
   setCoords(coordsOld, false); 
   if (segment == null) {
    segments[i].pointChanged(this);
   } else {
    segment.setCoordFromPoints(
      polygon.getPoint3D(i), polygon.getPoint3D((i + 1) % polygon.getPointsLength()));
    segment.pointChanged(this);
   }
   double dist; 
   if (hasWillingCoords() && hasWillingDirection()) {
    dist = getInhomCoords().distLine(getWillingCoords(), getWillingDirection());
   } else {
    dist = getInhomCoords().sub(coordsOld).squareNorm();
   }
   if (dist < minDist) {
    minDist = dist;
    res = getInhomCoords().copyVector();
    param = i + pp.getT();
   }
  }
  if (res != null) {
   setCoords(res, false);
   pp.setT(param);
  }
  setRegion(oldRegion);
 }
 public NumberValue getVerticalIncrement() {
  return verticalIncrement;
 }
 public void setVerticalIncrement(NumberValue step) {
  this.verticalIncrement = step;
 }
 public boolean canBeMirrored(GeoConicND conic) {
  return isWhollyIn2DView(app.getEuclidianView1())
    && conic.isWhollyIn2DView(app.getEuclidianView1());
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoPolyLine3D.java
```java
public class GeoPolyLine3D extends GeoPolyLine implements RotatableND, MirrorableAtPlane {
 private int index1;
 private int index2;
 private Coords direction1 = null;
 private Coords direction2 = null;
 private Coords direction3 = null;
 private boolean isPlanar = false;
 private Coords normal = null;
 private Coords tmpCoords;
 private GeoSegment3D seg = new GeoSegment3D(cons);
 public GeoPolyLine3D(Construction c, GeoPointND[] points) {
  super(c, points);
 }
 public GeoPolyLine3D(Construction c) {
  super(c);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.POLYLINE3D;
 }
 public boolean isGeoElement3D() {
  return true;
 }
 public boolean hasFillType() {
  return false;
 }
 public GeoElement copyInternal(Construction cons1) {
  GeoPolyLine3D ret = new GeoPolyLine3D(cons1, null);
  ret.points = GeoElement.copyPointsND(cons1, points);
  ret.set(this);
  return ret;
 }
 public void set(GeoElementND geo) {
  if (!(geo instanceof GeoPolyLine)) {
   Log.error("wrong class");
   return;
  }
  GeoPolyLine poly = (GeoPolyLine) geo;
  length = poly.getLength();
  defined = poly.isDefined();
  if (!defined || poly.getPointsND() == null) {
   return;
  }
  if (points.length != poly.getPointsND().length) {
   GeoPointND[] tempPoints = new GeoPointND[poly.getPointsND().length];
   for (int i = 0; i < tempPoints.length; i++) {
    tempPoints[i] = i < points.length ? points[i] : createNewPoint();
   }
   points = tempPoints;
  }
  for (int i = 0; i < points.length; i++) {
   points[i].set(poly.getPointsND()[i]);
  }
 }
 protected GeoPointND createNewPoint() {
  return new GeoPoint3D(cons);
 }
 private void setSegmentPoints(GeoPointND geoPoint, GeoPointND geoPoint2) {
  seg.setCoord(geoPoint, geoPoint2);
 }
 public boolean isOnPath(GeoPointND P, double eps) {
  if (P.getPath() == this) {
   return true;
  }
  for (int i = 0; i < points.length - 1; i++) {
   setSegmentPoints(points[i], points[i + 1]);
   if (seg.isOnPath(P, eps)) {
    return true;
   }
  }
  return false;
 }
 public void pathChanged(GeoPointND P) {
  if (!getKernel().usePathAndRegionParameters(P)) {
   pointChanged(P);
   return;
  }
  if (points.length == 1) {
   P.setCoords(points[0].getCoordsInD3(), false);
   return;
  }
  int index;
  PathParameter pp = P.getPathParameter();
  double t = pp.getT();
  if (t == points.length - 1) { 
   index = points.length - 2;
  } else {
   t = t % (points.length - 1);
   if (t < 0) {
    t += points.length - 1;
   }
   index = (int) Math.floor(t);
  }
  setSegmentPoints(points[index], points[index + 1]);
  double segParameter = t - index;
  if (tmpCoords == null) {
   tmpCoords = new Coords(4);
  }
  seg.getPointCoords(segParameter, tmpCoords);
  P.setCoords(tmpCoords, false);
  pp.setT(t);
 }
 public void pointChanged(GeoPointND P) {
  PathParameter pp = P.getPathParameter();
  double t = pp.getT();
  double localT = 0;
  int index;
  index = (int) Math.floor(t);
  int direction = 0;
  while (index >= 0 && index < getNumPoints() - 1) {
   setSegmentPoints(points[index], points[index + 1]);
   localT = seg.getParamOnLine(P);
   if (localT < 0 && direction <= 0) {
    direction = -1;
    index--;
   } else if (localT > 1 && direction >= 0) {
    direction = 1;
    index++;
   } else {
    break;
   }
  }
  if (index >= getNumPoints() - 1) {
   index = getNumPoints() - 1;
  } else if (index < 0) {
   index = 0;
  }
  t = index + Math.min(1, Math.max(0, localT));
  pp.setT(t);
  pathChanged(P);
 }
 public void matrixTransform(double a00, double a01, double a10, double a11) {
 }
 public void matrixTransform(
   double a00,
   double a01,
   double a02,
   double a10,
   double a11,
   double a12,
   double a20,
   double a21,
   double a22) {
 }
 @Deprecated
 public GeoPoint getPoint(int i) {
  return null;
 }
 public boolean isPlanar() {
  return isPlanar;
 }
 public void calcIsPlanar() {
  if (!isDefined()) {
   return;
  }
  if (getNumPoints() <= 3) {
   isPlanar = true;
   return;
  }
  normal = null;
  index1 = index2 = 0;
  direction1 = direction2 = direction3 = null;
  for (; index1 < getNumPoints() - 1; index1++) {
   if (!points[index1]
     .getInhomCoordsInD3()
     .equalsForKernel(points[0].getInhomCoordsInD3(), Kernel.STANDARD_PRECISION)) {
    direction1 = points[index1].getInhomCoordsInD3().sub(points[0].getInhomCoordsInD3());
    break;
   }
  }
  if (direction1 == null) {
   isPlanar = true;
   return;
  }
  for (index2 = index1 + 1; index2 < getNumPoints(); index2++) {
   direction2 = points[index2].getInhomCoordsInD3().sub(points[index1].getInhomCoordsInD3());
   normal = direction1.crossProduct(direction2);
   if (!normal.equalsForKernel(new Coords(0, 0, 0), Kernel.STANDARD_PRECISION)) {
    break;
   }
   direction2 = null;
   normal = null;
  }
  if (direction2 == null || index2 == getNumPoints() - 1) {
   isPlanar = true;
   return;
  }
  if (index2 + 1 < getNumPoints()) {
   direction3 = points[index2 + 1].getInhomCoordsInD3().sub(points[index2].getInhomCoordsInD3());
   if (!direction3
     .crossProduct(normal)
     .equalsForKernel(new Coords(0, 0, 0), Kernel.STANDARD_PRECISION)) {
    isPlanar = false;
    return;
   }
   isPlanar = true;
   direction3 = null;
  }
 }
 public void rotate(NumberValue r, Coords S, GeoDirectionND orientation) {
  for (GeoPointND point : points) {
   ((RotatableND) point).rotate(r, S, orientation);
  }
 }
 public void mirror(GeoCoordSys2D plane) {
  for (int i = 0; i < points.length; i++) {
   ((MirrorableAtPlane) points[i]).mirror(plane);
  }
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoPolygon3D.java
```java
public class GeoPolygon3D extends GeoPolygon
  implements GeoPolygon3DInterface, ViewCreator, RotatableND, MirrorableAtPlane {
 private CoordSys coordSys = new CoordSys(2);
 private GeoPoint[] points2D;
 private boolean isPartOfClosedSurface = false;
 private boolean createSegments = true;
 private ArrayList<GeoPoint3D> points3DArray;
 private EuclidianViewForPlaneCompanionInterface euclidianViewForPlane;
 private CoordMatrix4x4 tmpMatrix4x4;
 private boolean reverseNormal = false;
 private double[] tmp3;
 public GeoPolygon3D(Construction c, GeoPointND[] points, CoordSys cs2D, boolean createSegments) {
  super(c, points, cs2D, createSegments);
  this.createSegments = createSegments;
 }
 public GeoPolygon3D(Construction c, GeoPointND[] points) {
  this(c, points, null, true);
 }
 public GeoPolygon3D(Construction cons) {
  this(cons, false);
 }
 public GeoPolygon3D(Construction cons, boolean isIntersection) {
  super(cons, isIntersection);
 }
 public boolean isIntersection() {
  return isIntersection;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.POLYGON3D;
 }
 public boolean isGeoElement3D() {
  return true;
 }
 public boolean hasFillType() {
  return false;
 }
 public GeoSegmentND createSegment(
   Construction cons1, GeoPointND startPoint, GeoPointND endPoint, boolean euclidianVisible) {
  if (!startPoint.isGeoElement3D() && !endPoint.isGeoElement3D()) {
   return super.createSegmentOwnDimension(cons1, startPoint, endPoint, euclidianVisible);
  }
  return createSegmentOwnDimension(cons1, startPoint, endPoint, euclidianVisible);
 }
 public GeoSegmentND createSegmentOwnDimension(
   Construction cons1, GeoPointND startPoint, GeoPointND endPoint, boolean euclidianVisible) {
  AlgoJoinPoints3D algoSegment =
    new AlgoJoinPoints3D(cons, startPoint, endPoint, this, GeoClass.SEGMENT3D);
  cons.removeFromConstructionList(algoSegment);
  return createSegment((GeoSegmentND) algoSegment.getCS(), euclidianVisible);
 }
 public GeoPoint getPoint(int i) {
  return points2D[i];
 }
 public Coords getPoint3D(int i) {
  Coords v = super.getPoint3D(i);
  return coordSys.getPoint(v.getX(), v.getY());
 }
 public Coords getMainDirection() {
  if (reverseNormal) {
   return coordSys.getNormal().mul(-1);
  }
  return coordSys.getNormal();
 }
 public GeoPointND[] getPoints() {
  return points2D;
 }
 public void setPoints2D(GeoPoint[] points) {
  points2D = points;
 }
 public void setEuclidianVisible(boolean visible) {
  setEuclidianVisible(visible, createSegments);
 }
 public void setCoordSys(CoordSys cs) {
  if (points == null) {
   return;
  }
  points2D = new GeoPoint[points.length];
  for (int i = 0; i < points.length; i++) {
   points2D[i] = new GeoPoint(getConstruction(), true);
  }
  setDefined();
  if (cs == null) {
   coordSys = new CoordSys(2);
   updateCoordSys();
  } else {
   coordSys = cs;
  }
 }
 public void setCoordSys(GeoPolygon poly) {
  coordSys.set(poly.getCoordSys());
 }
 public void setCoordSysAndPoints3D(GeoPolygon poly) {
  setCoordSys(poly);
  setPoints3DLength();
  for (int i = 0; i < points2D.length; i++) {
   Coords v = super.getPoint3D(i);
   GeoPoint3D point = points3DArray.get(i);
   point.setCoords(coordSys.getPoint(v.getX(), v.getY()));
  }
  for (int i = points2D.length; i < points3DArray.size(); i++) {
   points3DArray.get(i).setUndefined();
  }
 }
 public void setPoints3DLength() {
  if (points3DArray == null) {
   points3DArray = new ArrayList<>();
  }
  for (int i = points3DArray.size(); i < points2D.length; i++) {
   GeoPoint3D point = new GeoPoint3D(cons);
   points3DArray.add(point);
   point.setCanBeRemovedAsInput(false);
  }
  points = new GeoPointND[points2D.length];
  for (int i = 0; i < points2D.length; i++) {
   points[i] = points3DArray.get(i);
  }
 }
 public void setPointsAndSegmentsLength(int polyLength) {
  setPointsLength(polyLength, null);
  setPoints3DLength();
  updateSegments(cons);
 }
 public boolean checkPointsAreOnCoordSys(double precision) {
  return checkPointsAreOnCoordSys(coordSys, points, points2D, new double[4], precision);
 }
 public static boolean checkPointsAreOnCoordSys(
   CoordSys coordSys,
   GeoPointND[] points,
   GeoPoint[] points2D,
   double[] tmpCoords,
   double precision) {
  Coords o = coordSys.getOrigin();
  Coords vn = coordSys.getVz();
  CoordMatrix4x4 matrix = coordSys.getMatrixOrthonormal();
  Coords d2 = new Coords(4);
  for (int i = 0; i < points.length; i++) {
   if (!points[i].isDefined() || !points[i].isFinite()) {
    coordSys.setUndefined();
    return false;
   }
   Coords p = points[i].getInhomCoordsInD3();
   d2.setSub(p, o);
   if (!DoubleUtil.isZero(vn.dotproduct3(d2), precision)) {
    coordSys.setUndefined();
    return false;
   }
   points2D[i].setCoords(matrix.getVx().dotproduct3(d2), matrix.getVy().dotproduct3(d2), 1);
  }
  return true;
 }
 private void updatePointsND(GeoPointND[] geos) {
  int newLength = geos.length;
  int oldLength = getPointsLength();
  int ndLength = getPointsND().length;
  for (int i = newLength; i < ndLength && i < oldLength; i++) {
   getPointND(i).setUndefined();
  }
  setPointsLength(newLength, null);
  setPoints3DLength();
  for (int i = 0; i < getPointsND().length && i < newLength; i++) {
   ExpressionNode oldDef = getPointND(i).getDefinition();
   getPointND(i).set(geos[i].toGeoElement(), false);
   if (!getPointND(i).isIndependent()) {
    getPointND(i).setDefinition(oldDef);
   }
  }
 }
 public void setPointsAndSegments(GeoPointND[] geos) {
  updatePointsND(geos);
  updateCoordSys();
  updateSegments(cons);
 }
 public boolean updateCoordSys() {
  return updateCoordSys(coordSys, points, points2D, new double[4], kernel.getStandardPrecision());
 }
 public static boolean updateCoordSys(
   CoordSys coordSys,
   GeoPointND[] points,
   GeoPoint[] points2D,
   double[] tmpCoords,
   double precision) {
  coordSys.resetCoordSys();
  for (int i = 0; !coordSys.isMadeCoordSys() && (i < points.length); i++) {
   if (!points[i].isDefined() || !points[i].isFinite()) {
    coordSys.setUndefined();
    return false;
   }
   coordSys.addPoint(points[i].getInhomCoordsInD3());
  }
  if (coordSys.getMadeCoordSys() != 2) {
   coordSys.completeCoordSys2D();
  }
  if (coordSys.makeOrthoMatrix(false, false)) {
   return checkPointsAreOnCoordSys(coordSys, points, points2D, tmpCoords, precision);
  }
  return true;
 }
 public final void setOrthoNormalRegionCS() {
  updateRegionCS(
    new GeoPoint(cons, 0, 0, 1), new GeoPoint(cons, 1, 0, 1), new GeoPoint(cons, 0, 1, 1));
 }
 public CoordSys getCoordSys() {
  if (coordSys == null) {
   coordSys = CoordSys.Identity3D;
  }
  return coordSys;
 }
 public boolean isDefined() {
  if (coordSys == null) {
   return false;
  }
  return super.isDefined() && coordSys.isDefined();
 }
 public void setIsPartOfClosedSurface(boolean v) {
  isPartOfClosedSurface = v;
 }
 public boolean isPartOfClosedSurface() {
  return isPartOfClosedSurface;
 }
 public void pathChanged(GeoPointND PI) {
  if (!getKernel().usePathAndRegionParameters(PI)) {
   pointChanged(PI);
   return;
  }
  if (!(PI instanceof GeoPoint3D)) {
   return;
  }
  GeoPoint3D P = (GeoPoint3D) PI;
  PathParameter pp = P.getPathParameter();
  double oldT = pp.getT();
  int index = (int) pp.getT();
  GeoSegmentND seg;
  if (segments == null) {
   seg = new GeoSegment3D(cons);
   ((GeoSegment3D) seg)
     .setCoordFromPoints(getPoint3D(index), getPoint3D((index + 1) % getPointsLength()));
  } else {
   seg = segments[index % segments.length];
  }
  pp.setT(pp.getT() - index);
  seg.pathChanged(P);
  pp.setT(oldT);
 }
 public void setRegionChanged(GeoPointND PI, double x, double y) {
  PI.setCoords2D(x, y, 1);
  PI.updateCoordsFrom2D(false, null);
 }
 public boolean isInRegion(GeoPointND PI) {
  Coords coords = PI.getCoordsInD2IfInPlane(getCoordSys());
  return isInRegion(coords);
 }
 public boolean isInRegionInRealCoords(GeoPointND PI) {
  Coords coords = PI.getCoordsInD2IfInPlaneInRealCoords(getCoordSys());
  return isInRegion(coords);
 }
 private boolean isInRegion(Coords coords) {
  return coords != null && isInRegion(coords.getX(), coords.getY());
 }
 protected GeoPolygon newGeoPolygon(Construction cons1) {
  return new GeoPolygon3D(cons1, null);
 }
 public Coords getDirectionInD3() {
  return getMainDirection();
 }
 public int getViewID() {
  return euclidianViewForPlane.getId();
 }
 public void createView2D() {
  euclidianViewForPlane =
    kernel.getApplication().getCompanion().createEuclidianViewForPlane(this, true);
  euclidianViewForPlane.setTransformRegardingView();
 }
 public void removeView2D() {
  euclidianViewForPlane.doRemove();
 }
 public void setEuclidianViewForPlane(EuclidianViewForPlaneCompanionInterface view) {
  euclidianViewForPlane = view;
 }
 public boolean hasView2DVisible() {
  return euclidianViewForPlane != null
    && kernel.getApplication().getGuiManager().showView(euclidianViewForPlane.getId());
 }
 public void setView2DVisible(boolean flag) {
  if (euclidianViewForPlane == null) {
   if (flag) {
    createView2D();
   }
   return;
  }
  kernel.getApplication().getGuiManager().setShowView(flag, euclidianViewForPlane.getId());
 }
 public void update(boolean drag) {
  super.update(drag);
  if (euclidianViewForPlane != null) {
   euclidianViewForPlane.updateForPlane();
  }
 }
 public void doRemove() {
  if (euclidianViewForPlane != null) {
   removeView2D();
  }
  super.doRemove();
 }
 public void matrixTransform(double a00, double a01, double a10, double a11) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = CoordMatrix4x4.identity();
  } else {
   tmpMatrix4x4.set(1, 3, 0);
   tmpMatrix4x4.set(1, 4, 0);
   tmpMatrix4x4.set(2, 3, 0);
   tmpMatrix4x4.set(2, 4, 0);
   tmpMatrix4x4.set(3, 1, 0);
   tmpMatrix4x4.set(3, 2, 0);
   tmpMatrix4x4.set(3, 3, 0);
   tmpMatrix4x4.set(3, 4, 0);
   tmpMatrix4x4.set(4, 1, 0);
   tmpMatrix4x4.set(4, 2, 0);
   tmpMatrix4x4.set(4, 3, 0);
   tmpMatrix4x4.set(4, 4, 1);
  }
  tmpMatrix4x4.set(1, 1, a00);
  tmpMatrix4x4.set(1, 2, a01);
  tmpMatrix4x4.set(2, 1, a10);
  tmpMatrix4x4.set(2, 2, a11);
  double[] ret = getCoordSys().matrixTransform(tmpMatrix4x4);
  super.matrixTransform(ret[0], ret[1], 0, ret[2]);
 }
 public void matrixTransform(
   double a00,
   double a01,
   double a02,
   double a10,
   double a11,
   double a12,
   double a20,
   double a21,
   double a22) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = CoordMatrix4x4.identity();
  } else {
   tmpMatrix4x4.resetLastRowAndColumn();
  }
  tmpMatrix4x4.set(1, 1, a00);
  tmpMatrix4x4.set(1, 2, a01);
  tmpMatrix4x4.set(1, 3, a02);
  tmpMatrix4x4.set(2, 1, a10);
  tmpMatrix4x4.set(2, 2, a11);
  tmpMatrix4x4.set(2, 3, a12);
  tmpMatrix4x4.set(3, 1, a20);
  tmpMatrix4x4.set(3, 2, a21);
  tmpMatrix4x4.set(3, 3, a22);
  double[] ret = getCoordSys().matrixTransform(tmpMatrix4x4);
  super.matrixTransform(ret[0], ret[1], 0, ret[2]);
 }
 public void rotate(NumberValue r) {
  getCoordSys().rotate(r.getDouble(), Coords.O);
  for (int i = 0; i < getPointsLength(); i++) {
   super.getPointND(i).rotate(r);
  }
  for (GeoSegmentND seg : getSegments()) {
   if (seg.isGeoElement3D()) {
    ((GeoSegment3D) seg).rotate(r);
   }
  }
 }
 public void rotate(NumberValue r, GeoPointND S) {
  getCoordSys().rotate(r.getDouble(), S.getInhomCoordsInD3());
  for (int i = 0; i < getPointsLength(); i++) {
   super.getPointND(i).rotate(r, S);
  }
  for (GeoSegmentND seg : getSegments()) {
   if (seg.isGeoElement3D()) {
    ((GeoSegment3D) seg).rotate(r, S);
   }
  }
 }
 public void rotate(NumberValue phiVal, Coords Q, GeoDirectionND orientation) {
  rotate(phiVal, Q, orientation.getDirectionInD3());
  for (int i = 0; i < getPointsLength(); i++) {
   ((GeoPoint3D) super.getPointND(i)).rotate(phiVal, Q, orientation);
  }
  for (GeoSegmentND seg : getSegments()) {
   if (seg.isGeoElement3D()) {
    ((GeoSegment3D) seg).rotate(phiVal, Q, orientation);
   }
  }
 }
 private void rotate(NumberValue phiVal, Coords center, Coords direction) {
  getCoordSys().rotate(phiVal.getDouble(), center, direction.normalized());
 }
 public void translate(Coords v) {
  getCoordSys().translate(v);
  for (int i = 0; i < getPointsLength(); i++) {
   super.getPointND(i).translate(v);
  }
  for (GeoSegmentND seg : getSegments()) {
   if (seg.isGeoElement3D()) {
    ((GeoSegment3D) seg).translate(v);
   }
  }
 }
 public void mirror(Coords Q) {
  getCoordSys().mirror(Q);
  for (int i = 0; i < getPointsLength(); i++) {
   super.getPointND(i).mirror(Q);
  }
  for (GeoSegmentND seg : getSegments()) {
   if (seg.isGeoElement3D()) {
    ((GeoSegment3D) seg).mirror(Q);
   }
  }
 }
 public void mirror(GeoLineND line) {
  Coords point = line.getStartInhomCoords();
  Coords direction = line.getDirectionInD3().normalized();
  getCoordSys().mirror(point, direction);
  reverseNormal = !reverseNormal;
  for (int i = 0; i < getPointsLength(); i++) {
   super.getPointND(i).mirror(line);
  }
  for (GeoSegmentND seg : getSegments()) {
   if (seg.isGeoElement3D()) {
    ((GeoSegment3D) seg).mirror(line);
   }
  }
 }
 public void mirror(GeoCoordSys2D plane) {
  getCoordSys().mirror(plane.getCoordSys());
  reverseNormal = !reverseNormal;
  for (int i = 0; i < getPointsLength(); i++) {
   ((GeoPoint3D) super.getPointND(i)).mirror(plane);
  }
  for (GeoSegmentND seg : getSegments()) {
   if (seg.isGeoElement3D()) {
    ((GeoSegment3D) seg).mirror(plane);
   }
  }
 }
 public void dilate(NumberValue rval, Coords S) {
  double r = rval.getDouble();
  getCoordSys().dilate(r, S);
  if (r < 0) { 
   r = -r;
  }
  for (int i = 0; i < getPointsLength(); i++) {
   getPoint(i).dilate(r);
  }
  this.calcArea();
  for (int i = 0; i < getPointsLength(); i++) {
   super.getPointND(i).dilate(rval, S);
  }
  for (GeoSegmentND seg : getSegments()) {
   if (seg.isGeoElement3D()) {
    ((GeoSegment3D) seg).dilate(rval, S);
   }
  }
 }
 public void setReverseNormal(boolean flag) {
  reverseNormal = flag;
 }
 public void setReverseNormal() {
  setReverseNormal(true);
 }
 public boolean hasReverseNormal() {
  return reverseNormal;
 }
 public void set(GeoElementND geo, Construction cons1) {
  if (geo.isGeoPolygon() && geo.isGeoElement3D()) {
   reverseNormal = ((GeoPolygon3D) geo).reverseNormal;
  }
  super.set(geo, cons1);
 }
 public final ExtendedBoolean isEqualExtended(GeoElementND geo) {
  if (geo.isGeoPolygon()) {
   GeoPolygon g = (GeoPolygon) geo;
   int gLength = g.getPointsLength();
   if (gLength == this.getPointsLength()) {
    return areAllPointsEqual(g);
   }
  }
  return ExtendedBoolean.FALSE;
 }
 private ExtendedBoolean areAllPointsEqual(GeoPolygon g) {
  int gLength = g.getPointsLength();
  Coords firstPoint = this.getPoint3D(0);
  boolean fPointFound = false;
  int iFirstPoint = 0;
  while (!fPointFound && (iFirstPoint < gLength)) {
   if (firstPoint.equalsForKernel(g.getPoint3D(iFirstPoint))) {
    fPointFound = true;
   } else {
    iFirstPoint++;
   }
  }
  if (fPointFound) {
   boolean sPointFound = false;
   int step = 1;
   if (this.getPoint3D(1).equalsForKernel(g.getPoint3D((iFirstPoint + step) % gLength))) {
    sPointFound = true;
   } else {
    step = -1;
    int j = iFirstPoint + step;
    if (j < 0) {
     j = gLength - 1;
    }
    if (this.getPoint3D(1).equalsForKernel(g.getPoint3D(j))) {
     sPointFound = true;
    }
   }
   if (sPointFound) {
    int i = 2;
    int j = iFirstPoint + step + step;
    if (j < 0) {
     j = j + gLength;
    }
    j = j % gLength;
    boolean pointOK = true;
    while (pointOK && (i < gLength)) {
     pointOK = this.getPoint3D(i).equalsForKernel(g.getPoint3D(j));
     j = j + step;
     if (j < 0) {
      j = gLength - 1;
     }
     j = j % gLength;
     i++;
    }
    return ExtendedBoolean.newExtendedBoolean(pointOK);
   }
  }
  return ExtendedBoolean.FALSE;
 }
 public boolean isConvexInverseDirection() {
  return reverseNormal;
 }
 public void calcCentroid(GeoPointND p) {
  if (tmp3 == null) {
   tmp3 = new double[3];
  }
  AlgoPolygon.calcCentroid(tmp3, area, getPoints());
  if (Double.isNaN(tmp3[0])) {
   p.setUndefined();
  } else {
   Coords c = getCoordSys().getPoint(tmp3[0], tmp3[1], tmp3[2]);
   p.setCoords(c, false);
  }
 }
 public GeoPointND newGeoPoint(Construction cons1) {
  return new GeoPoint3D(cons1);
 }
 public ValidExpression toValidExpression() {
  return getNumber();
 }
 public boolean isRegion3D() {
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoPolyhedron.java
```java
public class GeoPolyhedron extends GeoElement3D
  implements HasSegments,
    HasVolume,
    Traceable,
    RotatableND,
    Translateable,
    MirrorableAtPlane,
    Transformable,
    Dilateable,
    HasHeight,
    Path,
    GeoPolyhedronInterface,
    GeoNumberValue,
    Region,
    HasFaces {
 public enum Type {
  UNKNOWN,
  PYRAMID,
  PRISM,
  TETRAHEDRON,
  CUBE,
  OCTAHEDRON,
  DODECAHEDRON,
  ICOSAHEDRON,
  NET
 }
 Type type;
 protected TreeMap<ConstructionElementCycle, Long> segmentsIndex;
 protected long segmentsIndexMax = 0;
 protected TreeMap<Long, GeoSegment3D> segments;
 private TreeMap<ConstructionElementCycle, GeoSegmentND> segmentsLinked;
 protected TreeMap<ConstructionElementCycle, Integer> polygonsIndex;
 protected ArrayList<ConstructionElementCycle> polygonsDescriptions;
 protected int polygonsIndexMax = 0;
 protected TreeMap<Integer, GeoPolygon3D> polygons;
 protected ArrayList<GeoPolygon> polygonsLinked;
 protected ArrayList<GeoPoint3D> pointsCreated;
 private ConstructionElementCycle currentFace;
 private int topFaceIndex;
 private StringBuilder sb = new StringBuilder();
 private boolean allLabelsAreSet = false;
 private static Comparator<GeoPointND> pointIdComparator = null;
 private TreeMap<GeoPointND, GeoPoint3D> copyPoints;
 private boolean isDefined = true;
 private boolean trace;
 private double volume = Double.NaN;
 private double area = Double.NaN;
 private double orientedHeight;
 private StringBuilder sbToString = new StringBuilder(50);
 private boolean childrenLabelsSet = false;
 public static class DummyGeoPoint3D extends GeoPoint3D {
  private int index;
  public DummyGeoPoint3D(Construction c, int index) {
   super(c);
   this.index = index;
  }
  public int getDummyIndex() {
   return index;
  }
 }
 public static class DummyGeoSegment3D extends GeoSegment3D {
  private int index;
  public DummyGeoSegment3D(Construction c, int index) {
   super(c);
   this.index = index;
  }
  public int getDummyIndex() {
   return index;
  }
 }
 private static final class PointChangedHelper {
  private Coords coordsOld;
  private GeoPoint3D point;
  private boolean useLine;
  private double minDistLine;
  private double minDist;
  private Coords result;
  private double t1;
  private double t2;
  private boolean isOnPath;
  private int index;
  private int resultIndex;
  private GeoPolygon resultPolygon;
  private PointChangedHelper(GeoPoint3D point) {
   this.point = point;
   coordsOld = Coords.createInhomCoorsInD3();
   coordsOld.set3(point.getInhomCoordsInD3());
   minDistLine = Double.POSITIVE_INFINITY;
   minDist = Double.POSITIVE_INFINITY;
   useLine = point.hasWillingCoords() && point.hasWillingDirection();
   index = 0;
  }
  private void update(GeoPolygon polygon) {
   point.setRegion(polygon);
   point.setCoords(coordsOld, false);
   polygon.pointChangedForRegion(point);
   if (useLine) {
    double distLine =
      point.getInhomCoords().distLine(point.getWillingCoords(), point.getWillingDirection());
    double dist = point.getInhomCoords().sub(point.getWillingCoords()).squareNorm();
    if (DoubleUtil.isGreater(minDistLine, distLine)) {
     update(distLine, dist, polygon);
    } else if (DoubleUtil.isEqual(minDistLine, distLine)) {
     if (dist < minDist) {
      update(dist, polygon);
     }
    }
   } else {
    double dist = point.getInhomCoords().sub(coordsOld).squareNorm();
    if (dist < minDist) {
     update(dist, polygon);
    }
   }
   index++;
  }
  private void update(double distLine, double dist, GeoPolygon polygon) {
   minDistLine = distLine;
   update(dist, polygon);
  }
  private void update(double dist, GeoPolygon polygon) {
   minDist = dist;
   result = point.getInhomCoords().copyVector();
   RegionParameters rp = point.getRegionParameters();
   t1 = rp.getT1();
   t2 = rp.getT2();
   isOnPath = rp.isOnPath();
   resultIndex = index;
   resultPolygon = polygon;
  }
  private void setResult() {
   point.setCoords(result, false);
   RegionParameters rp = point.getRegionParameters();
   rp.setT1(getNormalized(t1) + resultIndex);
   rp.setT2(t2);
   rp.setNormal(resultPolygon.getDirectionInD3());
   rp.setIsOnPath(isOnPath);
  }
  private static double getNormalized(double t) {
   return (PathNormalizer.inverseInfFunction(t) + 1) / 2;
  }
  private static double getUnNormalized(double t) {
   return PathNormalizer.infFunction(2 * t - 1);
  }
 }
 public GeoPolyhedron(Construction c, Type polyhedronType) {
  super(c);
  this.type = polyhedronType;
  setConstructionDefaults(); 
  polygonsIndex = new TreeMap<>();
  polygonsDescriptions = new ArrayList<>();
  polygons = new TreeMap<>();
  segmentsIndex = new TreeMap<>();
  segments = new TreeMap<>();
  segmentsLinked = new TreeMap<>();
  polygonsLinked = new ArrayList<>();
  pointsCreated = new ArrayList<>();
 }
 private void addSegmentsLinked(GeoPolygon polygon) {
  if (polygon.getSegments() != null) {
   for (GeoSegmentND segment : polygon.getSegments()) {
    addSegmentLinked(segment);
   }
  }
 }
 public void updateSegmentsLinked() {
  segmentsLinked.clear();
  for (GeoPolygon p : getPolygonsLinked()) {
   addSegmentsLinked(p);
  }
 }
 public Collection<GeoSegmentND> getSegmentsLinked() {
  return segmentsLinked.values();
 }
 public Collection<GeoPolygon> getPolygonsLinked() {
  return polygonsLinked;
 }
 public GeoPolyhedron(GeoPolyhedron polyhedron) {
  this(polyhedron.getConstruction(), polyhedron.getPolyhedronType());
  set(polyhedron);
 }
 public Type getType() {
  return type;
 }
 public void startNewFace() {
  currentFace = new ConstructionElementCycle();
 }
 public void addPointToCurrentFace(GeoPointND point) {
  currentFace.add(point);
 }
 public void endCurrentFace() {
  currentFace.setDirection();
  polygonsIndex.put(currentFace, polygonsIndexMax);
  polygonsDescriptions.add(currentFace);
  polygonsIndexMax++;
 }
 public Integer getCurrentFaceIndex() {
  currentFace.setDirection();
  Integer index = polygonsIndex.get(currentFace);
  int ret;
  if (index == null) {
   ret = -1;
  } else {
   ret = index;
  }
  Log.debug(currentFace + ": " + ret);
  return index;
 }
 public ConstructionElementCycle getCurrentFace() {
  return currentFace;
 }
 public Collection<Integer> getPolygonsIndices() {
  return polygonsIndex.values();
 }
 public void setCurrentFaceIsTopFace() {
  topFaceIndex = polygonsIndexMax - 1;
 }
 public GeoPolygon3D createPolygon(int index) {
  currentFace = polygonsDescriptions.get(index);
  GeoPointND[] p = new GeoPointND[currentFace.size()];
  GeoSegmentND[] s = new GeoSegmentND[currentFace.size()];
  GeoPointND endPoint = (GeoPointND) currentFace.get(0);
  p[0] = endPoint; 
  GeoPointND firstPoint = endPoint;
  int j;
  for (j = 1; j < currentFace.size(); j++) {
   GeoPointND startPoint = endPoint;
   endPoint = (GeoPointND) currentFace.get(j);
   s[j - 1] = createSegment(startPoint, endPoint);
   p[j] = endPoint;
  }
  s[j - 1] = createSegment(endPoint, firstPoint);
  GeoPolygon3D polygon = createPolygon(p, index);
  polygon.setSegments(s);
  return polygon;
 }
 public void createFaces() {
  for (int index = 0; index < polygonsDescriptions.size(); index++) {
   createPolygon(index);
  }
 }
 public GeoPolygon3D createPolygon(GeoPointND[] points, int index) {
  AlgoPolygon3D algo = new AlgoPolygon3D(cons, points, false, this);
  cons.removeFromConstructionList(algo);
  GeoPolygon3D polygon = (GeoPolygon3D) algo.getPoly();
  polygon.setObjColor(getObjectColor());
  polygon.setAlphaValue(getAlphaValue());
  polygon.setLineThickness(getLineThickness());
  polygon.setLineType(getLineType());
  polygon.setInitLabelsCalled(true);
  if (condShowObject != null) {
   try {
    polygon.setShowObjectCondition(getShowObjectCondition());
   } catch (Exception ignored) {
   }
  }
  polygon.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
  polygons.put(index, polygon);
  return polygon;
 }
 public void addPolygonLinked(GeoPolygon polygon) {
  polygonsLinked.add(polygon);
  addSegmentsLinked(polygon);
  polygon.addMeta(this);
 }
 public void addPointCreated(GeoPoint3D point) {
  pointsCreated.add(point);
 }
 public GeoSegmentND createSegment(GeoPointND startPoint, GeoPointND endPoint) {
  if (startPoint instanceof DummyGeoPoint3D && endPoint instanceof DummyGeoPoint3D) {
   return new DummyGeoSegment3D(cons, ((DummyGeoPoint3D) startPoint).getDummyIndex());
  }
  ConstructionElementCycle key =
    ConstructionElementCycle.segmentDescription((GeoElement) startPoint, (GeoElement) endPoint);
  if (segmentsIndex.containsKey(key)) {
   return segments.get(segmentsIndex.get(key));
  }
  if (segmentsLinked.containsKey(key)) {
   return segmentsLinked.get(key);
  }
  return createNewSegment(startPoint, endPoint, key);
 }
 protected GeoSegmentND createNewSegment(
   GeoPointND startPoint, GeoPointND endPoint, ConstructionElementCycle key) {
  GeoSegment3D segment;
  AlgoJoinPoints3D algoSegment =
    new AlgoJoinPoints3D(cons, startPoint, endPoint, this, GeoClass.SEGMENT3D);
  cons.removeFromConstructionList(algoSegment);
  segment = (GeoSegment3D) algoSegment.getCS();
  segment.setObjColor(getObjectColor());
  segment.setLineThickness(getLineThickness());
  segment.setLineType(getLineType());
  if (condShowObject != null) {
   try {
    segment.setShowObjectCondition(getShowObjectCondition());
   } catch (Exception ignored) {
   }
  }
  segment.setAuxiliaryObject(Auxiliary.YES_DEFAULT);
  storeSegment(segment, key);
  return segment;
 }
 protected void storeSegment(GeoSegment3D segment, ConstructionElementCycle key) {
  Long index = segmentsIndexMax;
  segmentsIndex.put(key, index);
  segments.put(index, segment);
  segmentsIndexMax++;
 }
 public GeoSegmentND getSegment(GeoPointND startPoint, GeoPointND endPoint) {
  ConstructionElementCycle key =
    ConstructionElementCycle.segmentDescription((GeoElement) startPoint, (GeoElement) endPoint);
  if (segmentsIndex.containsKey(key)) {
   return segments.get(segmentsIndex.get(key));
  }
  if (segmentsLinked.containsKey(key)) {
   return segmentsLinked.get(key);
  }
  return null;
 }
 public void addSegmentLinked(GeoSegmentND segment) {
  ConstructionElementCycle key = ConstructionElementCycle.segmentDescription(
    segment.getStartPointAsGeoElement(), segment.getEndPointAsGeoElement());
  segmentsLinked.put(key, segment);
 }
 public void defaultLabels(String[] labels) {
  if (cons.isSuppressLabelsActive()) { 
   return;
  }
  if (labels == null || labels.length == 0) {
   setLabel(null);
  } else {
   setLabel(labels[0]);
  }
  defaultPolygonsLabels();
  defaultSegmentLabels();
 }
 public final boolean allLabelsAreSet() {
  return allLabelsAreSet;
 }
 public void setAllLabelsAreSet(boolean flag) {
  allLabelsAreSet = flag;
 }
 public void initLabels(String[] labels) {
  if (cons.isSuppressLabelsActive()) { 
   return;
  }
  if (labels == null || labels.length == 0) {
   initLabels(new String[1]);
   return;
  }
  setAllLabelsAreSet(true);
  setLabel(labels[0]);
  int index = 1;
  if (labels.length - index < pointsCreated.size()) {
   defaultPointsLabels();
   defaultPolygonsLabels();
   defaultSegmentLabels();
   return;
  }
  for (GeoPoint3D point : pointsCreated) {
   point.setLabel(labels[index]);
   index++;
  }
  if (labels.length - index < polygons.size()) {
   defaultPolygonsLabels();
   defaultSegmentLabels();
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setLabel(labels[index]);
   index++;
  }
  if (labels.length - index < segments.size()) {
   defaultSegmentLabels();
   return;
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setLabel(labels[index]);
   index++;
  }
 }
 private void defaultPointsLabels() {
  for (GeoPointND point : pointsCreated) {
   point.setLabel(null);
  }
 }
 private static int usableLabel(GeoElement geo) {
  if (!geo.isLabelSet()) {
   return 2; 
  } else if (geo.getLabel(StringTemplate.defaultTemplate).contains("_")) {
   return 2; 
  } else {
   return 0; 
  }
 }
 private void defaultPolygonsLabels() {
  for (Entry<ConstructionElementCycle, Integer> entry : polygonsIndex.entrySet()) {
   ConstructionElementCycle key = entry.getKey();
   String label1 = null;
   int labelUsability = 0;
   String[] points = new String[key.size()];
   int indexFirstPointName = 0;
   int i = 0;
   for (Iterator<GeoElementND> it = key.iterator(); it.hasNext() && (labelUsability < 2); ) {
    GeoElement p = (GeoElement) it.next();
    labelUsability += usableLabel(p);
    if (labelUsability < 2) {
     points[i] = p.getLabel(StringTemplate.defaultTemplate);
     if (points[i].compareToIgnoreCase(points[indexFirstPointName]) < 0) {
      indexFirstPointName = i;
     }
     i++;
    }
   }
   if (labelUsability < 2) {
    sb.setLength(0);
    sb.append(getLoc().getMenu("Name.face"));
    int indexSecondPointPlus = indexFirstPointName + 1;
    if (indexSecondPointPlus == points.length) {
     indexSecondPointPlus = 0;
    }
    int indexSecondPointMinus = indexFirstPointName - 1;
    if (indexSecondPointMinus == -1) {
     indexSecondPointMinus = points.length - 1;
    }
    if (points[indexSecondPointPlus].compareToIgnoreCase(points[indexSecondPointMinus]) < 0) {
     for (int j = indexFirstPointName; j < points.length; j++) {
      sb.append(points[j]);
     }
     for (int j = 0; j < indexFirstPointName; j++) {
      sb.append(points[j]);
     }
    } else {
     for (int j = indexFirstPointName; j >= 0; j--) {
      sb.append(points[j]);
     }
     for (int j = points.length - 1; j > indexFirstPointName; j--) {
      sb.append(points[j]);
     }
    }
    label1 = sb.toString();
   }
   polygons.get(entry.getValue()).setLabel(label1);
  }
 }
 private void defaultSegmentLabels() {
  for (Entry<ConstructionElementCycle, Long> entry : segmentsIndex.entrySet()) {
   ConstructionElementCycle key = entry.getKey();
   int labelUsability = 0;
   String label1 = null;
   String[] points = new String[2];
   int i = 0;
   for (Iterator<GeoElementND> it = key.iterator(); it.hasNext() && (labelUsability < 2); ) {
    GeoElement p = (GeoElement) it.next();
    labelUsability += usableLabel(p);
    if (labelUsability < 2) {
     points[i] = p.getLabel(StringTemplate.defaultTemplate);
     i++;
    }
   }
   if (labelUsability < 2) {
    sb.setLength(0);
    sb.append(getLoc().getMenu("Name.edge"));
    if (points[0].compareToIgnoreCase(points[1]) < 0) {
     sb.append(points[0]);
     sb.append(points[1]);
    } else {
     sb.append(points[1]);
     sb.append(points[0]);
    }
    label1 = sb.toString();
   }
   segments.get(entry.getValue()).setLabel(label1);
  }
 }
 public GeoSegmentND[] getSegments() {
  GeoSegmentND[] ret = new GeoSegmentND[segmentsLinked.size() + segments.size()];
  int i = 0;
  for (GeoSegmentND segment : segmentsLinked.values()) {
   ret[i] = segment;
   i++;
  }
  for (GeoSegment3D segment : segments.values()) {
   ret[i] = segment;
   i++;
  }
  return ret;
 }
 public GeoSegment3D[] getSegments3D() {
  GeoSegment3D[] ret = new GeoSegment3D[segments.size()];
  int i = 0;
  for (GeoSegment3D segment : segments.values()) {
   ret[i] = segment;
   i++;
  }
  return ret;
 }
 public GeoPolygon[] getFaces() {
  GeoPolygon[] polygonsArray = new GeoPolygon[polygonsLinked.size() + polygons.size()];
  int index = 0;
  for (GeoPolygon polygon : polygonsLinked) {
   polygonsArray[index] = polygon;
   index++;
  }
  for (GeoPolygon polygon : polygons.values()) {
   polygonsArray[index] = polygon;
   index++;
  }
  return polygonsArray;
 }
 public GeoPolygon3D[] getFaces3D() {
  GeoPolygon3D[] polygonsArray = new GeoPolygon3D[polygons.size()];
  int index = 0;
  for (GeoPolygon3D polygon : polygons.values()) {
   polygonsArray[index] = polygon;
   index++;
  }
  return polygonsArray;
 }
 public Collection<GeoPolygon3D> getFacesCollection() {
  return polygons.values();
 }
 public GeoPolygon getFace(int index) {
  int polygonsLinkedSize = polygonsLinked.size();
  if (index < polygonsLinkedSize) {
   return polygonsLinked.get(index);
  }
  return polygons.get(index - polygonsLinkedSize);
 }
 public int getFacesSize() {
  return polygonsLinked.size() + polygons.size();
 }
 public GeoPolygon3D getFace3D(int index) {
  return polygons.get(index);
 }
 public Collection<GeoPolygon3D> getPolygons() {
  return polygons.values();
 }
 public void setReverseNormalsForDrawing(boolean flag) {
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setReverseNormalForDrawing(flag);
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setReverseNormalForDrawing(flag);
  }
 }
 public void setReverseNormals(boolean flag) {
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setReverseNormal(flag);
  }
  setReverseNormalsForDrawing(flag);
 }
 public void setReverseNormals() {
  setReverseNormals(true);
 }
 public void setEuclidianVisible(boolean visible) {
  super.setEuclidianVisible(visible);
  if (cons.isFileLoading()) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setEuclidianVisible(visible, false);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setEuclidianVisible(visible, false);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setEuclidianVisible(visible);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   segment.setEuclidianVisible(visible);
  }
 }
 public void setObjColor(GColor color) {
  super.setObjColor(color);
  if (cons.isFileLoading()) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setObjColor(color);
   polygon.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setObjColor(color);
   polygon.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setObjColor(color);
   segment.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   segment.setObjColor(color);
   segment.updateVisualStyle(GProperty.COLOR);
  }
  getKernel().notifyRepaint();
 }
 public void removeColorFunction() {
  if (getColorFunction() == null) {
   return;
  }
  super.removeColorFunction();
  if (polygons == null || cons.isFileLoading()) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.removeColorFunction();
   polygon.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.removeColorFunction();
   polygon.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.removeColorFunction();
   segment.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   ((GeoElement) segment).removeColorFunction();
   segment.updateVisualStyle(GProperty.COLOR);
  }
  getKernel().notifyRepaint();
 }
 public void setColorFunction(final GeoList col) {
  super.setColorFunction(col);
  if (polygons == null || cons.isFileLoading()) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setColorFunction(col);
   polygon.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setColorFunction(col);
   polygon.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setColorFunction(col);
   segment.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   segment.setColorFunction(col);
   segment.updateVisualStyle(GProperty.COLOR);
  }
  getKernel().notifyRepaint();
 }
 public void setLineType(int type) {
  super.setLineType(type);
  if (polygons == null || cons.isFileLoading()) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setLineType(type, false);
   polygon.updateVisualStyle(GProperty.LINE_STYLE);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setLineType(type, false);
   polygon.updateVisualStyle(GProperty.LINE_STYLE);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setLineType(type);
   segment.updateVisualStyle(GProperty.LINE_STYLE);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   segment.setLineType(type);
   segment.updateVisualStyle(GProperty.LINE_STYLE);
  }
 }
 public void setLayer(int layer2) {
  super.setLayer(layer2);
  if (polygons == null || cons.isFileLoading()) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setLayer(layer2);
   polygon.updateVisualStyle(GProperty.LAYER);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setLayer(layer2);
   polygon.updateVisualStyle(GProperty.LAYER);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setLayer(layer2);
   segment.updateVisualStyle(GProperty.LAYER);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   segment.setLayer(layer2);
   segment.updateVisualStyle(GProperty.LAYER);
  }
 }
 public void setLineTypeHidden(int type) {
  super.setLineTypeHidden(type);
  if (polygons == null || cons.isFileLoading()) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setLineTypeHidden(type, false);
   polygon.updateVisualStyle(GProperty.LINE_STYLE);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setLineTypeHidden(type, false);
   polygon.updateVisualStyle(GProperty.LINE_STYLE);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setLineTypeHidden(type);
   segment.updateVisualStyle(GProperty.LINE_STYLE);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   segment.setLineTypeHidden(type);
   segment.updateVisualStyle(GProperty.LINE_STYLE);
  }
 }
 public void setLineThickness(int th) {
  super.setLineThickness(th);
  if (polygons == null || cons.isFileLoading()) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setLineThickness(th, false);
   polygon.update();
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setLineThickness(th, false);
   polygon.updateVisualStyle(GProperty.LINE_STYLE);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setLineThickness(th);
   segment.updateVisualStyle(GProperty.LINE_STYLE);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   segment.setLineThickness(th);
   segment.updateVisualStyle(GProperty.LINE_STYLE);
  }
  updateVisualStyle(GProperty.LINE_STYLE);
 }
 public void setLineThicknessOrVisibility(int th) {
  super.setLineThickness(th);
  if (polygons == null || cons.isFileLoading()) {
   return;
  }
  GProperty prop = th > 0 ? GProperty.LINE_STYLE : GProperty.COMBINED;
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setLineThickness(th, false);
   polygon.update();
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setLineThickness(th, false);
   polygon.updateVisualStyle(prop);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setLineThicknessOrVisibility(th);
   segment.updateVisualStyle(prop);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   ((GeoElement) segment).setLineThicknessOrVisibility(th);
   segment.updateVisualStyle(prop);
  }
 }
 public void setAlphaValue(double alpha) {
  super.setAlphaValue(alpha);
  if (cons.isFileLoading()) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setAlphaValue(alpha);
   polygon.updateVisualStyle(GProperty.COLOR);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setAlphaValue(alpha);
   polygon.updateVisualStyle(GProperty.COLOR);
  }
  getKernel().notifyRepaint();
 }
 public GeoElement copy() {
  return new GeoPolyhedron(this);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.POLYHEDRON;
 }
 public String getTypeString() {
  switch (type) {
   case PRISM:
    return "Prism";
   case PYRAMID:
    return "Pyramid";
   case TETRAHEDRON:
    return "Tetrahedron";
   case CUBE:
    return "Cube";
   case OCTAHEDRON:
    return "Octahedron";
   case DODECAHEDRON:
    return "Dodecahedron";
   case ICOSAHEDRON:
    return "Icosahedron";
   default:
    return "Polyhedron";
  }
 }
 public Type getPolyhedronType() {
  return type;
 }
 public boolean isDefined() {
  return isDefined;
 }
 public ExtendedBoolean isEqualExtended(GeoElementND geo) {
  return ExtendedBoolean.newExtendedBoolean(this == geo); 
 }
 public void set(GeoElementND geo) {
  if (geo instanceof GeoPolyhedron) {
   GeoPolyhedron polyhedron = (GeoPolyhedron) geo;
   isDefined = polyhedron.isDefined;
   type = polyhedron.type;
   setVolume(polyhedron.getVolume());
   setArea(polyhedron.getArea());
   setOrientedHeight(polyhedron.getOrientedHeight());
   topFaceIndex = polyhedron.topFaceIndex;
   if (!polyhedron.polygonsLinked.isEmpty()) {
    topFaceIndex++;
   }
   if (copyPoints == null) {
    initComparator();
    copyPoints = new TreeMap<>(pointIdComparator);
   }
   int index = 0;
   for (GeoSegmentND s : polyhedron.segmentsLinked.values()) {
    if (setSegment(index, s)) {
     index++;
    }
   }
   for (GeoSegment3D s : polyhedron.segments.values()) {
    if (setSegment(index, s)) {
     index++;
    }
   }
   if (!segments.isEmpty()) {
    for (int i = index; i <= segments.lastKey(); i++) {
     segments.get((long) i).setUndefined();
    }
   }
   index = 0;
   for (GeoPolygon p : polyhedron.polygonsLinked) {
    if (setPolygon(index, p)) {
     index++;
    }
   }
   for (GeoPolygon p : polyhedron.polygons.values()) {
    if (setPolygon(index, p)) {
     index++;
    }
   }
   for (Map.Entry<GeoPointND, GeoPoint3D> entry : copyPoints.entrySet()) {
    entry.getValue().set(entry.getKey());
   }
   AlgoElement algo = getParentAlgorithm();
   if (!(algo instanceof AlgoTransformation)) {
    updatePolygonsAndSegmentsAlgos();
   }
  }
 }
 private static void initComparator() {
  if (pointIdComparator == null) {
   pointIdComparator = Comparator.comparingLong(GeoElementND::getID);
  }
 }
 private GeoPoint3D getCopyPoint(GeoPointND point) {
  GeoPoint3D copyPoint = copyPoints.get(point);
  if (copyPoint == null) {
   copyPoint = new GeoPoint3D(point);
   copyPoints.put(point, copyPoint);
  }
  return copyPoint;
 }
 private boolean setPolygon(int index, GeoPolygon p) {
  if (!p.isDefined()) {
   return false;
  }
  int pointsLength = p.getPointsLength();
  if (pointsLength == 0) {
   return false;
  }
  GeoPoint3D[] pointsList = new GeoPoint3D[pointsLength];
  int i = 0;
  for (GeoPointND point : p.getPointsND()) {
   GeoPoint3D copyPoint = getCopyPoint(point);
   pointsList[i] = copyPoint;
   i++;
  }
  GeoPolygon3D poly = polygons.get(index);
  if (poly == null) {
   startNewFace();
   for (GeoPointND point : pointsList) {
    addPointToCurrentFace(point);
   }
   endCurrentFace();
   createPolygon(index);
  } else {
   poly.modifyInputPoints(pointsList);
  }
  return true;
 }
 private boolean setSegment(long index, GeoSegmentND s) {
  if (!s.isDefined()) {
   return false;
  }
  GeoPoint3D startPoint = getCopyPoint(s.getStartPoint());
  GeoPoint3D endPoint = getCopyPoint(s.getEndPoint());
  ConstructionElementCycle key =
    ConstructionElementCycle.segmentDescription(startPoint, endPoint);
  if (index >= segmentsIndexMax) {
   createNewSegment(startPoint, endPoint, key);
  } else {
   GeoSegment3D seg = segments.get(index);
   seg.modifyInputPoints(startPoint, endPoint);
   segmentsIndex.put(key, index);
  }
  return true;
 }
 public void setUndefined() {
  isDefined = false;
  volume = Double.NaN;
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setUndefined();
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setUndefined();
  }
 }
 public void setDefined() {
  isDefined = true;
 }
 protected boolean showInEuclidianView() {
  return isDefined();
 }
 public boolean isGeoPolyhedron() {
  return true;
 }
 public String toValueString(StringTemplate tpl) {
  return kernel.format(getVolume(), tpl);
 }
 public String toString(StringTemplate tpl) {
  sbToString.setLength(0);
  sbToString.append(label);
  sbToString.append(" = ");
  sbToString.append(kernel.format(getVolume(), tpl));
  return sbToString.toString();
 }
 public boolean isFillable() {
  return true;
 }
 protected void getStyleXML(XMLStringBuilder sbXml) {
  getLineStyleXML(sbXml);
  super.getStyleXML(sbXml);
 }
 public Coords getLabelPosition() {
  return Coords.O; 
 }
 public void remove() {
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.removeMeta(this);
  }
  if (this != getConstruction().getKeepGeo()) {
   super.remove();
  }
 }
 public void setVolume(double volume) {
  this.volume = volume;
 }
 public double getVolume() {
  return volume;
 }
 public boolean hasFiniteVolume() {
  return isDefined();
 }
 public void setArea(double area) {
  this.area = area;
 }
 public double getArea() {
  AlgoElement algo = getParentAlgorithm();
  if (algo instanceof AlgoPolyhedronPoints) {
   area = 0;
   for (GeoPolygon p : polygonsLinked) {
    area += p.getArea();
   }
   for (GeoPolygon p : polygons.values()) {
    if (p.isDefined()) {
     area += p.getArea();
    }
   }
  }
  return area;
 }
 public boolean hasFiniteArea() {
  return isDefined();
 }
 public boolean isTraceable() {
  return true;
 }
 public boolean getTrace() {
  return trace;
 }
 public void setTrace(boolean trace) {
  this.trace = trace;
  if (polygons == null) {
   return;
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setTrace(trace);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setTrace(trace);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setTrace(trace);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   ((Traceable) segment).setTrace(trace);
  }
  getKernel().notifyRepaint();
 }
 public void rotate(NumberValue r, GeoPointND S) {
  for (GeoPoint3D point : copyPoints.values()) {
   if (point.isDefined()) {
    point.rotate(r, S);
   }
  }
  updatePolygonsAndSegmentsAlgos();
 }
 public void rotate(NumberValue r) {
  for (GeoPoint3D point : copyPoints.values()) {
   if (point.isDefined()) {
    point.rotate(r);
   }
  }
  updatePolygonsAndSegmentsAlgos();
 }
 public void rotate(NumberValue r, Coords S, GeoDirectionND orientation) {
  for (GeoPoint3D point : copyPoints.values()) {
   if (point.isDefined()) {
    point.rotate(r, S, orientation);
   }
  }
  updatePolygonsAndSegmentsAlgos();
 }
 public final boolean isTranslateable() {
  return true;
 }
 public void translate(Coords v) {
  for (GeoPoint3D point : copyPoints.values()) {
   if (point.isDefined()) {
    point.translate(v);
   }
  }
  updatePolygonsAndSegmentsAlgos();
 }
 private void updatePolygonsAndSegmentsAlgos() {
  for (GeoSegment3D seg : segments.values()) {
   seg.getParentAlgorithm().update();
  }
  for (GeoPolygon3D p : polygons.values()) {
   p.getParentAlgorithm().update();
  }
 }
 public void mirror(Coords Q) {
  for (GeoPoint3D point : copyPoints.values()) {
   if (point.isDefined()) {
    point.mirror(Q);
   }
  }
  updatePolygonsAndSegmentsAlgos();
 }
 public void mirror(GeoLineND g) {
  for (GeoPoint3D point : copyPoints.values()) {
   if (point.isDefined()) {
    point.mirror(g);
   }
  }
  updatePolygonsAndSegmentsAlgos();
 }
 public void mirror(GeoCoordSys2D plane) {
  for (GeoPoint3D point : copyPoints.values()) {
   if (point.isDefined()) {
    point.mirror(plane);
   }
  }
  updatePolygonsAndSegmentsAlgos();
 }
 public void dilate(NumberValue rval, Coords S) {
  for (GeoPoint3D point : copyPoints.values()) {
   if (point.isDefined()) {
    point.dilate(rval, S);
   }
  }
  updatePolygonsAndSegmentsAlgos();
  double r = rval.getDouble();
  double rAbs = Math.abs(r);
  volume *= rAbs * rAbs * rAbs;
  area *= rAbs * rAbs;
  orientedHeight *= r;
 }
 public void setOrientedHeight(double height) {
  orientedHeight = height;
 }
 public double getOrientedHeight() {
  return orientedHeight;
 }
 public GeoPolygon getBottomFace() {
  if (polygonsLinked.isEmpty()) {
   return polygons.get(0);
  }
  return polygonsLinked.get(0);
 }
 public GeoPolygon getTopFace() {
  return polygons.get(topFaceIndex);
 }
 public GeoPolygon getFirstSideFace() {
  if (polygonsLinked.isEmpty()) {
   return polygons.get(1);
  }
  return polygons.get(0);
 }
 public Coords getTopPoint() {
  GeoPolygon p = getFirstSideFace();
  return p.getPoint3D(p.getPointsLength() - 1);
 }
 public boolean isPath() {
  return true;
 }
 public PathMover createPathMover() {
  return new PathMoverGeneric(this);
 }
 public double getMaxParameter() {
  return segmentsLinked.size() + segments.size();
 }
 public double getMinParameter() {
  return 0;
 }
 public boolean isClosedPath() {
  return true;
 }
 public void pathChanged(GeoPointND PI) {
  if (!getKernel().usePathAndRegionParameters(PI)) {
   pointChanged(PI);
   return;
  }
  if (!(PI instanceof GeoPoint3D)) {
   return;
  }
  GeoPoint3D P = (GeoPoint3D) PI;
  PathParameter pp = P.getPathParameter();
  double oldT = pp.getT();
  int index = (int) pp.getT();
  GeoSegmentND seg;
  if (index < segmentsLinked.size()) {
   seg = segmentsLinked.values().toArray(new GeoSegmentND[0])[index];
  } else {
   seg = segments.values().toArray(new GeoSegmentND[0])[index - segmentsLinked.size()];
  }
  pp.setT(pp.getT() - index);
  seg.pathChanged(P);
  pp.setT(oldT);
 }
 public void pointChanged(GeoPointND PI) {
  if (!(PI instanceof GeoPoint3D)) {
   return;
  }
  GeoPoint3D P = (GeoPoint3D) PI;
  Coords coordsOld = P.getInhomCoords().copyVector();
  final Region region = P.getRegion();
  P.setRegion(null);
  double minDist = Double.POSITIVE_INFINITY;
  Coords res = null;
  double param = 0;
  PathParameter pp = P.getPathParameter();
  int i = 0;
  for (GeoSegmentND segment : segmentsLinked.values()) {
   P.setCoords(coordsOld, false); 
   if (segment.isDefined()) {
    segment.pointChanged(P);
   }
   double dist; 
   if (P.hasWillingCoords() && P.hasWillingDirection()) {
    dist = P.getInhomCoords().distLine(P.getWillingCoords(), P.getWillingDirection());
   } else {
    dist = P.getInhomCoords().sub(coordsOld).squareNorm();
   }
   if (dist < minDist) {
    minDist = dist;
    res = P.getInhomCoords().copyVector();
    param = i + pp.getT();
   }
   i++;
  }
  for (GeoSegmentND segment : segments.values()) {
   P.setCoords(coordsOld, false); 
   if (segment.isDefined()) {
    segment.pointChanged(P);
   }
   double dist; 
   if (P.hasWillingCoords() && P.hasWillingDirection()) {
    dist = P.getInhomCoords().distLine(P.getWillingCoords(), P.getWillingDirection());
   } else {
    dist = P.getInhomCoords().sub(coordsOld).squareNorm();
   }
   if (dist < minDist) {
    minDist = dist;
    res = P.getInhomCoords().copyVector();
    param = i + pp.getT();
   }
   i++;
  }
  P.setCoords(res, false);
  pp.setT(param);
  P.setRegion(region);
 }
 public boolean isOnPath(GeoPointND P, double eps) {
  if (P.getPath() == this) {
   return true;
  }
  for (GeoSegmentND segment : segmentsLinked.values()) {
   if (segment.isDefined() && segment.isOnPath(P, eps)) {
    return true;
   }
  }
  for (GeoSegmentND segment : segments.values()) {
   if (segment.isDefined() && segment.isOnPath(P, eps)) {
    return true;
   }
  }
  return false;
 }
 public void setShowObjectCondition(final GeoBoolean cond) throws CircularDefinitionException {
  super.setShowObjectCondition(cond);
  if (cons.isFileLoading()) {
   return;
  }
  for (GeoPoint3D point : pointsCreated) {
   point.setShowObjectCondition(cond);
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.setShowObjectCondition(cond);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.setShowObjectCondition(cond);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.setShowObjectCondition(cond);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   segment.setShowObjectCondition(cond);
  }
 }
 public void updateVisualStyle(GProperty prop) {
  super.updateVisualStyle(prop);
  for (GeoPoint3D point : pointsCreated) {
   point.updateVisualStyle(prop);
  }
  for (GeoPolygon3D polygon : polygons.values()) {
   polygon.updateVisualStyle(prop);
  }
  for (GeoPolygon polygon : polygonsLinked) {
   polygon.updateVisualStyle(prop);
  }
  for (GeoSegment3D segment : segments.values()) {
   segment.updateVisualStyle(prop);
  }
  for (GeoSegmentND segment : getSegmentsLinked()) {
   segment.updateVisualStyle(prop);
  }
 }
 public void setPointSizeOrVisibility(int size) {
  for (GeoPoint3D point : pointsCreated) {
   setPointSize(point, size);
  }
  if (getParentAlgorithm() != null) {
   for (GeoElement point : getParentAlgorithm().getInput()) {
    if (point.isGeoPoint()) {
     setPointSize((GeoPointND) point, size);
    }
   }
  }
  for (GeoPolygon p : polygonsLinked) {
   p.setPointSizeOrVisibility(size);
  }
 }
 private static void setPointSize(GeoPointND point, int size) {
  if (size > 0) {
   point.setEuclidianVisibleIfNoConditionToShowObject(true);
   point.setPointSize(size);
  } else {
   point.setEuclidianVisibleIfNoConditionToShowObject(false);
  }
  point.updateRepaint();
 }
 public final HitType getLastHitType() {
  return HitType.ON_FILLING;
 }
 public MyDouble getNumber() {
  return new MyDouble(kernel, getDouble());
 }
 public double getDouble() {
  return getVolume();
 }
 public ValueType getValueType() {
  return ValueType.NUMBER;
 }
 public void pseudoCentroid(Coords coords) {
  coords.set(0, 0, 0);
  int n = 0;
  for (GeoSegment3D segment : segments.values()) {
   pseudoCentroidAdd(coords, segment);
   n++;
  }
  for (GeoSegmentND segment : segmentsLinked.values()) {
   pseudoCentroidAdd(coords, segment);
   n++;
  }
  coords.mulInside(0.5 / n);
 }
 private static void pseudoCentroidAdd(Coords coords, GeoSegmentND segment) {
  coords.setAdd3(coords, segment.getStartInhomCoords());
  coords.setAdd3(coords, segment.getEndInhomCoords());
 }
 public int getMinimumLineThickness() {
  return 0;
 }
 public void setChildrenLabelsSet(boolean flag) {
  childrenLabelsSet = flag;
 }
 public boolean getChildrenLabelsSet() {
  return childrenLabelsSet;
 }
 public void replaceDummies(GeoPointND[] points, GeoSegmentND[] replacementSegments) {
  for (GeoSegment3D seg : getSegments3D()) {
   GeoPointND p1 = seg.getStartPoint();
   GeoPointND p2 = seg.getEndPoint();
   boolean needsChange = false;
   if (p1 instanceof DummyGeoPoint3D) {
    p1 = points[((DummyGeoPoint3D) p1).getDummyIndex()];
    needsChange = true;
   }
   if (p2 instanceof DummyGeoPoint3D) {
    p2 = points[((DummyGeoPoint3D) p2).getDummyIndex()];
    needsChange = true;
   }
   if (needsChange) {
    seg.modifyInputPoints(p1, p2);
   }
  }
  for (GeoPolygon3D poly : getPolygons()) {
   GeoPointND[] polyPoints = poly.getPointsND();
   GeoPointND[] newPoints = new GeoPointND[polyPoints.length];
   boolean pointsNeedChange = false;
   for (int i = 0; i < polyPoints.length; i++) {
    GeoPointND p = polyPoints[i];
    if (p instanceof DummyGeoPoint3D) {
     newPoints[i] = points[((DummyGeoPoint3D) p).getDummyIndex()];
     pointsNeedChange = true;
    } else {
     newPoints[i] = p;
    }
   }
   if (pointsNeedChange) {
    GeoSegmentND[] polySegments = poly.getSegments();
    GeoSegmentND[] newSegments = new GeoSegmentND[polySegments.length];
    boolean segmentsNeedChange = false;
    for (int i = 0; i < polySegments.length; i++) {
     GeoSegmentND s = polySegments[i];
     if (s instanceof DummyGeoSegment3D) {
      newSegments[i] = replacementSegments[((DummyGeoSegment3D) s).getDummyIndex()];
      segmentsNeedChange = true;
     } else {
      newSegments[i] = s;
     }
    }
    poly.modifyInputPoints(newPoints);
    if (segmentsNeedChange) {
     poly.setSegments(newSegments);
    }
   }
  }
 }
 public boolean isRegion() {
  return true;
 }
 public boolean isRegion3D() {
  return true;
 }
 public void pointChangedForRegion(GeoPointND P) {
  Region oldRegion = P.getRegion();
  PointChangedHelper helper = new PointChangedHelper((GeoPoint3D) P);
  for (GeoPolygon p : getPolygonsLinked()) {
   if (p.isDefined()) {
    helper.update(p);
   }
  }
  for (GeoPolygon3D p : getPolygons()) {
   if (p.isDefined()) {
    helper.update(p);
   }
  }
  helper.setResult();
  P.setRegion(oldRegion);
 }
 public void regionChanged(GeoPointND P) {
  RegionParameters rp = P.getRegionParameters();
  double t1 = rp.getT1();
  int index = (int) t1;
  GeoPolygon polygon =
    index < getFacesSize() ? getFace(index) : polygons.lastEntry().getValue();
  if (!polygon.isDefined()) {
   for (int i = getFacesSize() - 1; i >= 0 && !polygon.isDefined(); i--) {
    polygon = getFace(i);
   }
  }
  rp.setT1(PointChangedHelper.getUnNormalized(t1 - index));
  Region oldRegion = P.getRegion();
  P.setRegion(polygon);
  polygon.regionChanged(P);
  rp.setT1(t1);
  rp.setNormal(polygon.getDirectionInD3());
  P.setRegion(oldRegion);
 }
 public boolean isInRegion(GeoPointND P) {
  for (GeoPolygon3D p : getPolygons()) {
   if (p.isInRegionInRealCoords(P)) {
    return true;
   }
  }
  return false;
 }
 public boolean isInRegion(double x0, double y0) {
  return false;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoPolyhedronNet.java
```java
public class GeoPolyhedronNet extends GeoPolyhedron {
 private GeoPolygon3D[] oldFaces;
 private int oldFacesIndex;
 private GeoSegment3D[] oldSegments;
 private StringBuilder sbToString = new StringBuilder(50);
 public GeoPolyhedronNet(Construction c) {
  super(c, GeoPolyhedron.Type.NET);
 }
 public String getTypeString() {
  return "Net";
 }
 public boolean isGeoPolyhedron() {
  return false;
 }
 public final String toString(StringTemplate tpl) {
  sbToString.setLength(0);
  sbToString.append(label);
  sbToString.append(" = ");
  sbToString.append(kernel.format(getArea(), tpl));
  return sbToString.toString();
 }
 public final String toValueString(StringTemplate tpl) {
  return kernel.format(getArea(), tpl);
 }
 public void createFaces() {
  if (polygons != null) {
   oldFaces = getFaces3D();
   oldFacesIndex = 0;
   polygons.clear();
  } else {
   oldFaces = null;
  }
  if (segments != null) {
   oldSegments = getSegments3D();
   segments.clear();
  } else {
   oldSegments = null;
  }
  super.createFaces();
 }
 public void clearIndexes() {
  polygonsIndex.clear();
  polygonsDescriptions.clear();
  polygonsIndexMax = 0;
  segmentsIndex.clear();
  segmentsIndexMax = 0;
 }
 public GeoPolygon3D createPolygon(GeoPointND[] points, int index) {
  if (oldFaces != null && oldFacesIndex < oldFaces.length) {
   GeoPolygon3D polygon = oldFaces[oldFacesIndex];
   polygon.modifyInputPoints(points);
   polygons.put(index, polygon);
   oldFacesIndex++;
   return polygon;
  }
  return super.createPolygon(points, index);
 }
 public GeoSegmentND createNewSegment(
   GeoPointND startPoint, GeoPointND endPoint, ConstructionElementCycle key) {
  if (oldSegments != null && segmentsIndexMax < oldSegments.length) {
   GeoSegment3D segment = oldSegments[(int) segmentsIndexMax];
   segment.modifyInputPoints(startPoint, endPoint);
   storeSegment(segment, key);
   return segment;
  }
  return super.createNewSegment(startPoint, endPoint, key);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.NET;
 }
 public void setEuclidianVisible(boolean visible) {
  super.setEuclidianVisible(visible);
  for (GeoPoint3D point : pointsCreated) {
   point.setEuclidianVisible(visible);
  }
 }
 public double getDouble() {
  return getArea();
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoQuadric3D.java
```java
public class GeoQuadric3D extends GeoQuadricND
  implements Functional2Var,
    Region3D,
    Translateable,
    RotatableND,
    MirrorableAtPlane,
    Transformable,
    Dilateable,
    HasVolume,
    GeoQuadric3DInterface,
    EquationValue,
    MatrixTransformable {
 private static String[] vars3D = {
  "x\u00b2", "y\u00b2", "z\u00b2", "x y", "x z", "y z", "x", "y", "z"
 };
 private static String[] vars3DCAS = {"x^2", "y^2", "z^2", "x*y", "x*z", "y*z", "x", "y", "z"};
 private CoordMatrix4x4 eigenMatrix = CoordMatrix4x4.identity();
 protected double[] tmpDouble2 = new double[2];
 private double detS;
 private GeoPlane3D[] planes;
 private GeoLine3D line;
 private CoordMatrix eigenvecNDMatrix;
 private CoordMatrix semiDiagMatrix;
 private Coords tmpCoords2;
 private Coords tmpCoords3;
 private Coords tmpCoords4;
 private Coords tmpCoords5;
 private CoordMatrix tmpMatrix4x2;
 private CoordMatrix tmpMatrix2x4;
 private CoordMatrix4x4 tmpMatrix4x4;
 private double[] tmpEqn;
 private Coords tmpCoords = new Coords(4);
 private double[] lastHitParameters = null;
 private Coords[] eigenvec;
 private double volume = Double.NaN;
 private boolean showUndefinedInAlgebraView = false;
 private Coords tmpCoords6;
 protected double[] diagonal;
 private CoordMatrix tmpEigenMatrix;
 public GeoQuadric3D(Construction c) {
  super(c, 3);
  eigenvecND = new Coords[3];
  for (int i = 0; i < 3; i++) {
   eigenvecND[i] = new Coords(4);
   eigenvecND[i].set(i + 1, 1);
  }
  diagonal = new double[4];
 }
 public GeoQuadric3D(Construction c, double[] coeffs) {
  this(c);
  setMatrix(coeffs);
 }
 public final void setMatrix(double[] coeffs) {
  for (int i = 0; i < 10; i++) {
   matrix[i] = coeffs[i];
  }
  classifyQuadric();
 }
 public final void setMatrixFromXML(double[] coeffs) {
  for (int i = 0; i < 10; i++) {
   matrix[i] = coeffs[i];
  }
  ensureClassified();
 }
 public void ensureClassified() {
  if (type == GeoQuadricNDConstants.QUADRIC_NOT_CLASSIFIED) {
   classifyQuadric();
  }
 }
 public void hideIfNotSphere() {
  if (type != QUADRIC_SPHERE && type != QUADRIC_SINGLE_POINT) {
   setEuclidianVisible(false);
  }
 }
 protected void classifyQuadric() {
  defined = checkDefined();
  if (!defined) {
   return;
  }
  double max = Math.abs(matrix[0]);
  for (int i = 1; i < 3; i++) {
   double v = Math.abs(matrix[i]);
   if (v > max) {
    max = v;
   }
  }
  for (int i = 4; i < 7; i++) {
   double v = Math.abs(matrix[i]);
   if (v > max) {
    max = v;
   }
  }
  detS = matrix[0] * matrix[1] * matrix[2]
    - matrix[0] * matrix[6] * matrix[6]
    - matrix[1] * matrix[5] * matrix[5]
    - matrix[2] * matrix[4] * matrix[4]
    + 2 * matrix[4] * matrix[5] * matrix[6];
  double v = max * max * max;
  if (DoubleUtil.isEpsilonWithPrecision(detS, v, Kernel.STANDARD_PRECISION_CUBE)) {
   classifyNoMidpointQuadric();
  } else {
   classifyMidpointQuadric();
  }
 }
 private void classifyNoMidpointQuadric() {
  eigenval[0] = -matrix[0] * matrix[1]
    - matrix[1] * matrix[2]
    - matrix[2] * matrix[0]
    + matrix[4] * matrix[4]
    + matrix[5] * matrix[5]
    + matrix[6] * matrix[6];
  eigenval[1] = matrix[0] + matrix[1] + matrix[2];
  eigenval[2] = -1;
  int nRoots = EquationSolver.solveQuadraticS(eigenval, eigenval, Kernel.STANDARD_PRECISION);
  if (nRoots == 1) {
   eigenval[1] = eigenval[0];
  }
  eigenval[2] = 0;
  if (DoubleUtil.isZero(eigenval[0])) {
   if (DoubleUtil.isZero(eigenval[1])) {
    getPlanes();
    planes[0].setEquation(matrix[7], matrix[8], matrix[9], matrix[3] / 2);
    planes[0].getCoordSys().makeEquationVector();
    type = GeoQuadricNDConstants.QUADRIC_PLANE;
   } else {
    twoZeroEigenvalues(eigenval[1]);
   }
  } else if (DoubleUtil.isZero(eigenval[1])) {
   twoZeroEigenvalues(eigenval[0]);
  } else {
   if (tmpCoords2 == null) {
    tmpCoords2 = new Coords(4);
   }
   if (tmpCoords3 == null) {
    tmpCoords3 = new Coords(4);
   }
   tmpCoords.setValues(eigenvecND[0], 3);
   tmpCoords2.setValues(eigenvecND[2], 3);
   if (DoubleUtil.isRatioEqualTo1(eigenval[0], eigenval[1])) {
    findEigenvector(eigenval[2], eigenvecND[2]);
    eigenvecND[2].normalize();
    eigenvecND[2].completeOrthonormal(eigenvecND[0], eigenvecND[1]);
   } else {
    findEigenvector(eigenval[0], eigenvecND[0]);
    eigenvecND[0].normalize();
    findEigenvector(eigenval[1], eigenvecND[1]);
    eigenvecND[1].normalize();
    eigenvecND[2].setCrossProduct4(eigenvecND[0], eigenvecND[1]);
   }
   boolean reverse = false;
   if (tmpCoords2.dotproduct3(eigenvecND[2]) < 0) { 
    eigenvecND[2].mulInside3(-1);
    reverse = true;
   }
   double dot0 = tmpCoords.dotproduct3(eigenvecND[0]);
   double dot1 = tmpCoords.dotproduct3(eigenvecND[1]);
   if (Math.abs(dot0) < Math.abs(dot1)) { 
    double e = eigenval[0];
    eigenval[0] = eigenval[1];
    eigenval[1] = e;
    tmpCoords.setValues(eigenvecND[0], 3);
    eigenvecND[0].setValues(eigenvecND[1], 3);
    eigenvecND[1].setValues(tmpCoords, 3);
    reverse = !reverse;
    dot0 = dot1;
   }
   if (reverse) {
    if (dot0 < 0) { 
     eigenvecND[0].mulInside3(-1);
    } else { 
     eigenvecND[1].mulInside3(-1);
    }
   } else {
    if (dot0 < 0) { 
     eigenvecND[0].mulInside3(-1);
     eigenvecND[1].mulInside3(-1);
    }
   }
   setSemiDiagonalizedMatrix();
   double x = semiDiagMatrix.get(1, 4);
   double y = semiDiagMatrix.get(2, 4);
   double z = semiDiagMatrix.get(3, 4);
   double d = semiDiagMatrix.get(4, 4);
   if (eigenval[0] * eigenval[1] > 0) {
    double m = x * x / eigenval[0] + y * y / eigenval[1] - d;
    if (DoubleUtil.isZero(z)) {
     classifyCylinder(x, y, m);
    } else {
     paraboloid(-x / eigenval[0], -y / eigenval[1], z, m);
    }
   } else { 
    double m = x * x / eigenval[0] + y * y / eigenval[1] - d;
    if (DoubleUtil.isZero(z)) {
     classifyHyperbolicCylinder(x, y, m);
    } else {
     hyperbolicParaboloid(-x / eigenval[0], -y / eigenval[1], z, m);
    }
   }
  }
 }
 private void classifyHyperbolicCylinder(double x, double y, double m) {
  if (DoubleUtil.isZero(m)) {
   intersectingPlanes(-x / eigenval[0], -y / eigenval[1]);
  } else {
   hyperbolicCylinder(-x / eigenval[0], -y / eigenval[1], m);
  }
 }
 private void classifyCylinder(double x, double y, double m) {
  if (DoubleUtil.isZero(m)) {
   singleLine(-x / eigenval[0], -y / eigenval[1]);
  } else if (eigenval[0] * m < 0) {
   defined = false;
   empty();
  } else {
   cylinder(-x / eigenval[0], -y / eigenval[1], m);
  }
 }
 private void paraboloid(double x, double y, double z, double m) {
  midpoint.set(Coords.O);
  midpoint.addInside(tmpCoords.setMul(eigenvecND[0], x));
  midpoint.addInside(tmpCoords.setMul(eigenvecND[1], y));
  midpoint.addInside(tmpCoords.setMul(eigenvecND[2], m / (2 * z)));
  halfAxes[0] = Math.sqrt(Math.abs(2 * z / eigenval[0]));
  halfAxes[1] = Math.sqrt(Math.abs(2 * z / eigenval[1]));
  if (z * eigenval[0] < 0) {
   halfAxes[2] = 1;
  } else {
   halfAxes[2] = -1;
  }
  diagonal[0] = eigenval[0];
  diagonal[1] = eigenval[1];
  diagonal[2] = eigenval[2];
  diagonal[3] = 0;
  setEigenMatrix(halfAxes[0], halfAxes[1], halfAxes[2]);
  type = QUADRIC_PARABOLOID;
 }
 private void singleLine(double x, double y) {
  midpoint.set(Coords.O);
  midpoint.addInside(tmpCoords.setMul(eigenvecND[0], x));
  midpoint.addInside(tmpCoords.setMul(eigenvecND[1], y));
  getLine();
  line.setCoord(midpoint, eigenvecND[2]);
  type = GeoQuadricNDConstants.QUADRIC_LINE;
 }
 private void findEigenvector(double value, Coords ret) {
  double[][] mat2d = new double[3][3];
  mat2d[0][0] = matrix[0];
  mat2d[1][1] = matrix[1];
  mat2d[2][2] = matrix[2];
  mat2d[0][1] = matrix[4];
  mat2d[1][0] = matrix[4];
  mat2d[0][2] = matrix[5];
  mat2d[2][0] = matrix[5];
  mat2d[1][2] = matrix[6];
  mat2d[2][1] = matrix[6];
  RealMatrix realMatrix = new Array2DRowRealMatrix(mat2d);
  EigenDecomposition solver = new EigenDecomposition(realMatrix);
  double[] eigenValues = solver.getRealEigenvalues();
  for (int i = 0; i < eigenValues.length; i++) {
   if (DoubleUtil.isEqual(value, eigenValues[i])) {
    ret.set(solver.getEigenvector(i).toArray());
   }
  }
 }
 public GeoPlane3D[] getPlanes() {
  if (planes == null) {
   planes = new GeoPlane3D[2];
   planes[0] = new GeoPlane3D(cons);
   planes[1] = new GeoPlane3D(cons);
  }
  return planes;
 }
 public GeoLine3D getLine() {
  if (line == null) {
   line = new GeoLine3D(cons);
  }
  return line;
 }
 private void setSemiDiagonalizedMatrix() {
  if (eigenvecNDMatrix == null) {
   eigenvecNDMatrix = new CoordMatrix(eigenvecND[0], eigenvecND[1], eigenvecND[2], Coords.O);
  }
  if (semiDiagMatrix == null) {
   semiDiagMatrix = new CoordMatrix(4, 4);
  }
  eigenvecNDMatrix.transposeCopy(semiDiagMatrix);
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  tmpMatrix4x4.setMul(semiDiagMatrix, getSymmetricMatrix());
  semiDiagMatrix.setMul(tmpMatrix4x4, eigenvecNDMatrix);
 }
 private void twoZeroEigenvalues(double value) {
  tmpCoords.setValues(eigenvecND[2], 3);
  findEigenvector(value, eigenvecND[2]);
  eigenvecND[2].normalize();
  if (tmpCoords.dotproduct3(eigenvecND[2]) < 0) {
   eigenvecND[2].mulInside3(-1);
  }
  completeOrthonormalRatioEqualTo1(eigenvecND[0], eigenvecND[1], eigenvecND[2]);
  setSemiDiagonalizedMatrix();
  if (!DoubleUtil.isZero(semiDiagMatrix.get(1, 4))
    || !DoubleUtil.isZero(semiDiagMatrix.get(2, 4))) {
   parabolicCylinder(value);
  } else {
   double a = semiDiagMatrix.get(3, 4);
   double b = semiDiagMatrix.get(4, 4);
   double c = a / value;
   double m = c * c - b / value;
   if (DoubleUtil.isZero(m)) {
    getPlanes();
    buildPlane(0, -c);
    type = QUADRIC_PLANE;
   } else if (m > 0) {
    parallelPlanes(Math.sqrt(m), c);
   } else { 
    defined = false;
    empty();
   }
  }
 }
 private void parallelPlanes(double shift, double c) {
  getPlanes();
  buildPlane(0, -shift - c);
  buildPlane(1, shift - c);
  type = GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES;
 }
 private void buildPlane(int i, double v) {
  CoordSys cs = planes[i].getCoordSys();
  cs.resetCoordSys();
  tmpCoords.setMul(eigenvecND[2], v);
  tmpCoords.setW(1);
  cs.setOrigin(tmpCoords);
  cs.setVx(eigenvecND[0]);
  cs.setVy(eigenvecND[1]);
  cs.setVz(eigenvecND[2]);
  cs.setMatrixOrthonormalAndDrawingMatrix();
  cs.setMadeCoordSys();
  cs.makeEquationVector();
 }
 private void parabolicCylinder(double value) {
  final double a = semiDiagMatrix.get(1, 4);
  final double b = semiDiagMatrix.get(2, 4);
  double norm = Math.sqrt(a * a + b * b);
  eigenvecND[0].setMul(eigenvecND[0], a / norm);
  tmpCoords.setMul(eigenvecND[1], b / norm);
  eigenvecND[0].setAdd(eigenvecND[0], tmpCoords);
  double valSgn = -1;
  if (value > 0) {
   valSgn = 1;
   eigenvecND[0].mulInside3(-1);
  }
  eigenvecND[1].setCrossProduct4(eigenvecND[2], eigenvecND[0]);
  eigenval[0] = 0;
  eigenval[1] = 0;
  eigenval[2] = value;
  final double c = semiDiagMatrix.get(3, 4);
  final double d = semiDiagMatrix.get(4, 4);
  midpoint.set(Coords.O);
  midpoint.addInside(tmpCoords.setMul(eigenvecND[0], valSgn * (d - c * c / value) / (2 * norm)));
  midpoint.addInside(tmpCoords.setMul(eigenvecND[2], -c / value));
  halfAxes[0] = 1;
  halfAxes[1] = 1;
  halfAxes[2] = Math.sqrt(2 * norm / Math.abs(value));
  diagonal[0] = eigenval[0];
  diagonal[1] = eigenval[1];
  diagonal[2] = eigenval[2];
  diagonal[3] = 0;
  setEigenMatrix(halfAxes[0], halfAxes[1], halfAxes[2]);
  type = QUADRIC_PARABOLIC_CYLINDER;
 }
 private void hyperbolicCylinder(double x0, double y0, double m) {
  mu[0] = eigenval[0] / m;
  double x, y;
  if (mu[0] > 0) {
   mu[1] = eigenval[1] / m;
   x = x0;
   y = y0;
  } else { 
   mu[1] = mu[0];
   mu[0] = eigenval[1] / m;
   double v = eigenval[1];
   eigenval[1] = eigenval[0];
   eigenval[0] = v;
   tmpCoords.setValues(eigenvecND[1], 3);
   eigenvecND[1].setValues(eigenvecND[0], 3);
   eigenvecND[0].setValues(tmpCoords, 3);
   eigenvecND[2].mulInside3(-1);
   x = y0;
   y = x0;
  }
  midpoint.set(Coords.O);
  midpoint.addInside(tmpCoords.setMul(eigenvecND[0], x));
  midpoint.addInside(tmpCoords.setMul(eigenvecND[1], y));
  halfAxes[0] = Math.sqrt(1.0d / mu[0]);
  halfAxes[1] = Math.sqrt(-1.0d / mu[1]);
  halfAxes[2] = 1;
  diagonal[0] = eigenval[0];
  diagonal[1] = eigenval[1];
  diagonal[2] = 0;
  diagonal[3] = -m;
  setEigenMatrix(halfAxes[0], halfAxes[1], 1);
  type = QUADRIC_HYPERBOLIC_CYLINDER;
 }
 private void hyperbolicParaboloid(double x, double y, double z, double m) {
  midpoint.set(Coords.O);
  midpoint.addInside(tmpCoords.setMul(eigenvecND[0], x));
  midpoint.addInside(tmpCoords.setMul(eigenvecND[1], y));
  midpoint.addInside(tmpCoords.setMul(eigenvecND[2], m / (2 * z)));
  halfAxes[0] = eigenval[0] / (-2 * z);
  halfAxes[1] = eigenval[1] / (-2 * z);
  halfAxes[2] = 1;
  diagonal[0] = eigenval[0];
  diagonal[1] = eigenval[1];
  diagonal[2] = eigenval[2];
  diagonal[3] = 0;
  setEigenMatrix(1, 1, 1);
  type = QUADRIC_HYPERBOLIC_PARABOLOID;
 }
 private void intersectingPlanes(double dx, double dy) {
  getPlanes();
  if (tmpCoords2 == null) {
   tmpCoords2 = new Coords(4);
  }
  if (tmpCoords3 == null) {
   tmpCoords3 = new Coords(4);
  }
  if (tmpCoords4 == null) {
   tmpCoords4 = new Coords(4);
  }
  if (tmpCoords5 == null) {
   tmpCoords5 = new Coords(4);
  }
  tmpCoords4.setMul(eigenvecND[0], dx);
  tmpCoords5.setMul(eigenvecND[1], dy);
  tmpCoords4.addInside(tmpCoords5);
  tmpCoords4.setW(1);
  CoordSys cs = planes[0].getCoordSys();
  cs.resetCoordSys();
  cs.addPoint(tmpCoords4);
  cs.addVectorWithoutCheckMadeCoordSys(eigenvecND[2]);
  tmpCoords.setMul(eigenvecND[0], Math.sqrt(-eigenval[1] / eigenval[0]));
  tmpCoords2.setMul(eigenvecND[1], 1);
  tmpCoords3.setAdd(tmpCoords, tmpCoords2);
  cs.addVectorWithoutCheckMadeCoordSys(tmpCoords3);
  cs.makeOrthoMatrix(false, false);
  cs.makeEquationVector();
  cs = planes[1].getCoordSys();
  cs.resetCoordSys();
  cs.addPoint(tmpCoords4);
  cs.addVectorWithoutCheckMadeCoordSys(eigenvecND[2]);
  tmpCoords3.setSub(tmpCoords, tmpCoords2);
  cs.addVectorWithoutCheckMadeCoordSys(tmpCoords3);
  cs.makeOrthoMatrix(false, false);
  cs.makeEquationVector();
  type = GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES;
 }
 private void classifyMidpointQuadric() {
  double x = (-matrix[1] * matrix[2] * matrix[7]
      + matrix[1] * matrix[5] * matrix[9]
      + matrix[2] * matrix[4] * matrix[8]
      - matrix[4] * matrix[6] * matrix[9]
      - matrix[5] * matrix[6] * matrix[8]
      + matrix[6] * matrix[6] * matrix[7])
    / detS;
  double y = (-matrix[0] * matrix[2] * matrix[8]
      + matrix[0] * matrix[6] * matrix[9]
      + matrix[2] * matrix[4] * matrix[7]
      - matrix[4] * matrix[5] * matrix[9]
      + matrix[5] * matrix[5] * matrix[8]
      - matrix[5] * matrix[6] * matrix[7])
    / detS;
  double z = (-matrix[0] * matrix[1] * matrix[9]
      + matrix[0] * matrix[6] * matrix[8]
      + matrix[1] * matrix[5] * matrix[7]
      + matrix[4] * matrix[4] * matrix[9]
      - matrix[4] * matrix[5] * matrix[8]
      - matrix[4] * matrix[6] * matrix[7])
    / detS;
  double[] coords = {x, y, z, 1};
  setMidpoint(coords);
  eigenval[0] = detS;
  eigenval[1] = -matrix[0] * matrix[1]
    - matrix[1] * matrix[2]
    - matrix[2] * matrix[0]
    + matrix[4] * matrix[4]
    + matrix[5] * matrix[5]
    + matrix[6] * matrix[6];
  eigenval[2] = matrix[0] + matrix[1] + matrix[2];
  eigenval[3] = -1;
  int nRoots = EquationSolver.solveCubicS(eigenval, eigenval, Kernel.STANDARD_PRECISION);
  if (nRoots == 1) {
   eigenval[1] = eigenval[0];
   nRoots++;
  }
  if (nRoots == 2) {
   eigenval[2] = eigenval[1];
  }
  double beta = matrix[7] * x + matrix[8] * y + matrix[9] * z + matrix[3];
  if (DoubleUtil.isZero(beta)) {
   cone();
  } else if (eigenval[0] > 0) {
   classifyMainEigenvaluePositive(beta);
  } else { 
   classifyMainEigenvalueNegative(beta);
  }
 }
 private void classifyMainEigenvalueNegative(double beta) {
  if (eigenval[1] > 0) {
   if (eigenval[2] > 0) { 
    if (beta > 0) { 
     hyperboloidTwoSheets(eigenval[0], eigenval[1], eigenval[2], beta);
    } else { 
     hyperboloidOneSheet(eigenval[1], eigenval[2], eigenval[0], beta);
    }
   } else { 
    if (beta > 0) { 
     hyperboloidOneSheet(eigenval[2], eigenval[0], eigenval[1], beta);
    } else { 
     hyperboloidTwoSheets(eigenval[1], eigenval[2], eigenval[0], beta);
    }
   }
  } else { 
   if (eigenval[2] > 0) { 
    if (beta > 0) { 
     hyperboloidOneSheet(eigenval[0], eigenval[1], eigenval[2], beta);
    } else { 
     hyperboloidTwoSheets(eigenval[2], eigenval[0], eigenval[1], beta);
    }
   } else { 
    if (beta > 0) {
     ellipsoid(beta);
    } else {
     empty();
    }
   }
  }
 }
 private void classifyMainEigenvaluePositive(double beta) {
  if (eigenval[1] > 0) {
   if (eigenval[2] > 0) { 
    if (beta > 0) {
     empty();
    } else {
     ellipsoid(beta);
    }
   } else { 
    if (beta > 0) { 
     hyperboloidTwoSheets(eigenval[2], eigenval[0], eigenval[1], beta);
    } else { 
     hyperboloidOneSheet(eigenval[0], eigenval[1], eigenval[2], beta);
    }
   }
  } else { 
   if (beta > 0) { 
    hyperboloidTwoSheets(eigenval[1], eigenval[2], eigenval[0], beta);
   } else { 
    hyperboloidOneSheet(eigenval[2], eigenval[0], eigenval[1], beta);
   }
  }
 }
 private void hyperboloidOneSheet(double val0, double val1, double val2, double beta) {
  eigenval[0] = val0;
  eigenval[1] = val1;
  eigenval[2] = val2;
  setHyperboloidEigenvectors();
  mu[0] = -eigenval[0] / beta;
  mu[1] = -eigenval[1] / beta;
  mu[2] = -eigenval[2] / beta;
  halfAxes[0] = Math.sqrt(1.0d / mu[0]);
  halfAxes[1] = Math.sqrt(1.0d / mu[1]);
  double min = Math.min(mu[0], mu[1]);
  double e3;
  if (DoubleUtil.isEpsilonToX(mu[2], min)) {
   halfAxes[2] = Double.POSITIVE_INFINITY;
   e3 = 1;
  } else {
   halfAxes[2] = Math.sqrt(-1.0d / mu[2]);
   e3 = halfAxes[2];
  }
  for (int i = 0; i < 3; i++) {
   diagonal[i] = mu[i];
  }
  diagonal[3] = -1;
  setEigenMatrix(halfAxes[0], halfAxes[1], e3);
  type = QUADRIC_HYPERBOLOID_ONE_SHEET;
 }
 private void hyperboloidTwoSheets(double val0, double val1, double val2, double beta) {
  eigenval[0] = val1;
  eigenval[1] = val2;
  eigenval[2] = val0;
  setHyperboloidEigenvectors();
  mu[0] = -eigenval[0] / beta;
  mu[1] = -eigenval[1] / beta;
  mu[2] = -eigenval[2] / beta;
  halfAxes[0] = Math.sqrt(-1.0d / mu[0]);
  halfAxes[1] = Math.sqrt(-1.0d / mu[1]);
  halfAxes[2] = Math.sqrt(1.0d / mu[2]);
  for (int i = 0; i < 3; i++) {
   diagonal[i] = mu[i];
  }
  diagonal[3] = -1;
  setEigenMatrix(halfAxes[0], halfAxes[1], halfAxes[2]);
  type = QUADRIC_HYPERBOLOID_TWO_SHEETS;
 }
 private void completeOrthonormalRatioEqualTo1(Coords ev0, Coords ev1, Coords ev2) {
  tmpCoords.setCrossProduct4(ev2, ev0);
  if (!tmpCoords.isZero(3)) {
   ev1.setValues(tmpCoords, 3);
   ev1.normalize();
   ev0.setCrossProduct3(ev1, ev2);
   ev0.normalize();
  } else if (!ev1.isZero()) { 
   ev0.setCrossProduct3(ev1, ev2);
   if (ev0.isZero()) {
    ev2.completeOrthonormal3(ev0, ev1);
   } else {
    ev0.normalize();
   }
  } else {
   ev2.completeOrthonormal3(ev0, ev1);
  }
 }
 private void setHyperboloidEigenvectors() {
  tmpCoords.setValues(eigenvecND[2], 3);
  findEigenvector(eigenval[2], eigenvecND[2]);
  eigenvecND[2].normalize();
  if (tmpCoords.dotproduct3(eigenvecND[2]) < 0) {
   eigenvecND[2].mulInside3(-1);
  }
  if (DoubleUtil.isRatioEqualTo1(eigenval[0], eigenval[1])) {
   completeOrthonormalRatioEqualTo1(eigenvecND[0], eigenvecND[1], eigenvecND[2]);
  } else {
   tmpCoords.setValues(eigenvecND[0], 3);
   findEigenvector(eigenval[0], eigenvecND[0]);
   eigenvecND[0].normalize();
   eigenvecND[1].setCrossProduct4(eigenvecND[2], eigenvecND[0]);
   double dot0 = tmpCoords.dotproduct3(eigenvecND[0]);
   double dot1 = tmpCoords.dotproduct3(eigenvecND[1]);
   if (Math.abs(dot1) > Math.abs(dot0)) { 
    tmpCoords.setValues(eigenvecND[0], 3);
    eigenvecND[0].setValues(eigenvecND[1], 3);
    eigenvecND[1].setValues(tmpCoords, 3);
    double tmp = eigenval[0];
    eigenval[0] = eigenval[1];
    eigenval[1] = tmp;
    if (dot1 < 0) { 
     eigenvecND[0].mulInside3(-1);
    } else {
     eigenvecND[1].mulInside3(-1);
    }
   } else {
    if (dot0 < 0) { 
     eigenvecND[0].mulInside3(-1);
     eigenvecND[1].mulInside3(-1);
    }
   }
  }
 }
 private void cone() {
  if (eigenval[0] > 0 && eigenval[1] > 0 && eigenval[2] > 0) {
   singlePoint();
  } else if (eigenval[0] < 0 && eigenval[1] < 0 && eigenval[2] < 0) {
   singlePoint();
  } else {
   findEigenvectors();
   int directionIndex, ellipseIndex0, ellipseIndex1;
   if (eigenval[0] * eigenval[1] > 0) {
    directionIndex = 2;
    ellipseIndex0 = 0;
    ellipseIndex1 = 1;
   } else if (eigenval[0] * eigenval[2] > 0) {
    directionIndex = 1;
    ellipseIndex0 = 2;
    ellipseIndex1 = 0;
   } else {
    directionIndex = 0;
    ellipseIndex0 = 1;
    ellipseIndex1 = 2;
   }
   tmpCoords.setValues(eigenvecND[2], 3);
   eigenvecND[2].setValues(eigenvec[directionIndex], 3);
   if (tmpCoords.dotproduct3(eigenvecND[2]) < 0) { 
    eigenvecND[2].mulInside3(-1);
    int index = ellipseIndex0;
    ellipseIndex0 = ellipseIndex1;
    ellipseIndex1 = index;
   }
   tmpCoords.setValues(eigenvecND[0], 3);
   double dot0 = tmpCoords.dotproduct3(eigenvec[ellipseIndex0]);
   double dot1 = tmpCoords.dotproduct3(eigenvec[ellipseIndex1]);
   if (Math.abs(dot0) < Math.abs(dot1)) {
    int index = ellipseIndex0;
    ellipseIndex0 = ellipseIndex1;
    ellipseIndex1 = index;
    if (dot1 < 0) {
     eigenvec[ellipseIndex0].mulInside3(-1);
    } else {
     eigenvec[ellipseIndex1].mulInside3(-1);
    }
   } else {
    if (dot0 < 0) {
     eigenvec[ellipseIndex0].mulInside3(-1);
     eigenvec[ellipseIndex1].mulInside3(-1);
    }
   }
   eigenvecND[0].setValues(eigenvec[ellipseIndex0], 3);
   eigenvecND[1].setValues(eigenvec[ellipseIndex1], 3);
   halfAxes[0] = Math.sqrt(-eigenval[directionIndex] / eigenval[ellipseIndex0]);
   halfAxes[1] = Math.sqrt(-eigenval[directionIndex] / eigenval[ellipseIndex1]);
   halfAxes[2] = 1;
   diagonal[0] = eigenval[ellipseIndex0];
   diagonal[1] = eigenval[ellipseIndex1];
   diagonal[2] = eigenval[directionIndex];
   diagonal[3] = 0;
   setEigenMatrix(halfAxes[0], halfAxes[1], 1);
   type = QUADRIC_CONE;
  }
 }
 private void cylinder(double x, double y, double m) {
  midpoint.set(Coords.O);
  midpoint.addInside(tmpCoords.setMul(eigenvecND[0], x));
  midpoint.addInside(tmpCoords.setMul(eigenvecND[1], y));
  halfAxes[0] = Math.sqrt(m / eigenval[0]);
  halfAxes[1] = Math.sqrt(m / eigenval[1]);
  halfAxes[2] = 1;
  diagonal[0] = eigenval[0];
  diagonal[1] = eigenval[1];
  diagonal[2] = eigenval[2];
  diagonal[3] = 0;
  setEigenMatrix(halfAxes[0], halfAxes[1], 1);
  type = QUADRIC_CYLINDER;
 }
 @SuppressWarnings("PMD.AvoidDeeplyNestedIfStmts")
 private void ellipsoid(double beta) {
  if (DoubleUtil.isEqual(eigenval[0] / eigenval[1], 1.0)
    && DoubleUtil.isEqual(eigenval[0] / eigenval[2], 1.0)) {
   mu[0] = -eigenval[0] / beta;
   mu[1] = -eigenval[1] / beta;
   mu[2] = -eigenval[2] / beta;
   double r = Math.sqrt(1.0d / mu[0]);
   for (int i = 0; i < 3; i++) {
    halfAxes[i] = r;
   }
   type = QUADRIC_SPHERE;
   linearEccentricity = 0.0d;
   eccentricity = 0.0d;
   volume = 4 * Math.PI * getHalfAxis(0) * getHalfAxis(1) * getHalfAxis(2) / 3;
   diagonal[0] = 1;
   diagonal[1] = 1;
   diagonal[2] = 1;
   diagonal[3] = -r * r;
   setEigenMatrix(halfAxes[0], halfAxes[1], halfAxes[2]);
  } else { 
   findEigenvectors();
   boolean reverse = false;
   double dot0 = eigenvecND[0].dotproduct3(eigenvec[0]);
   double dot1 = eigenvecND[0].dotproduct3(eigenvec[1]);
   double dot2 = eigenvecND[0].dotproduct3(eigenvec[2]);
   if (Math.abs(dot1) > Math.abs(dot0)) {
    if (Math.abs(dot2) > Math.abs(dot1)) {
     eigenvecND[0].setValues(eigenvec[2], 3);
     double tmp = eigenval[0];
     eigenval[0] = eigenval[2];
     if (dot2 < 0) { 
      eigenvecND[0].mulInside3(-1);
      reverse = true;
     }
     dot0 = eigenvecND[1].dotproduct3(eigenvec[0]);
     dot1 = eigenvecND[1].dotproduct3(eigenvec[1]);
     if (Math.abs(dot1) > Math.abs(dot0)) { 
      eigenvecND[1].setValues(eigenvec[1], 3);
      eigenvecND[2].setValues(eigenvec[0], 3);
      eigenval[2] = tmp;
      dot0 = dot1;
      reverse = !reverse;
     } else { 
      eigenvecND[1].setValues(eigenvec[0], 3);
      eigenvecND[2].setValues(eigenvec[1], 3);
      eigenval[2] = eigenval[1];
      eigenval[1] = tmp;
     }
     if (dot0 < 0) { 
      eigenvecND[1].mulInside3(-1);
      reverse = !reverse;
     }
     if (reverse) { 
      eigenvecND[2].mulInside3(-1);
     }
    } else {
     eigenvecND[0].setValues(eigenvec[1], 3);
     double tmp = eigenval[0];
     eigenval[0] = eigenval[1];
     if (dot1 < 0) { 
      eigenvecND[0].mulInside3(-1);
      reverse = true;
     }
     dot0 = eigenvecND[1].dotproduct3(eigenvec[0]);
     dot2 = eigenvecND[1].dotproduct3(eigenvec[2]);
     if (Math.abs(dot2) > Math.abs(dot0)) { 
      eigenvecND[1].setValues(eigenvec[2], 3);
      eigenvecND[2].setValues(eigenvec[0], 3);
      eigenval[1] = eigenval[2];
      eigenval[2] = tmp;
      dot0 = dot2;
     } else { 
      eigenvecND[1].setValues(eigenvec[0], 3);
      eigenval[1] = tmp;
      eigenvecND[2].setValues(eigenvec[2], 3);
      reverse = !reverse;
     }
     if (dot0 < 0) { 
      eigenvecND[1].mulInside3(-1);
      reverse = !reverse;
     }
     if (reverse) { 
      eigenvecND[2].mulInside3(-1);
     }
    }
   } else {
    if (Math.abs(dot2) > Math.abs(dot0)) {
     eigenvecND[0].setValues(eigenvec[2], 3);
     double tmp = eigenval[0];
     eigenval[0] = eigenval[2];
     if (dot2 < 0) { 
      eigenvecND[0].mulInside3(-1);
      reverse = true;
     }
     dot0 = eigenvecND[1].dotproduct3(eigenvec[0]);
     dot1 = eigenvecND[1].dotproduct3(eigenvec[1]);
     if (Math.abs(dot1) > Math.abs(dot0)) { 
      eigenvecND[1].setValues(eigenvec[1], 3);
      eigenvecND[2].setValues(eigenvec[0], 3);
      eigenval[2] = tmp;
      dot0 = dot1;
      reverse = !reverse;
     } else { 
      eigenvecND[1].setValues(eigenvec[0], 3);
      eigenvecND[2].setValues(eigenvec[1], 3);
      eigenval[2] = eigenval[1];
      eigenval[1] = tmp;
     }
     if (dot0 < 0) { 
      eigenvecND[1].mulInside3(-1);
      reverse = !reverse;
     }
     if (reverse) { 
      eigenvecND[2].mulInside3(-1);
     }
    } else {
     eigenvecND[0].setValues(eigenvec[0], 3);
     if (dot0 < 0) { 
      eigenvecND[0].mulInside3(-1);
      reverse = true;
     }
     dot1 = eigenvecND[1].dotproduct3(eigenvec[1]);
     dot2 = eigenvecND[1].dotproduct3(eigenvec[2]);
     if (Math.abs(dot2) > Math.abs(dot1)) { 
      eigenvecND[1].setValues(eigenvec[2], 3);
      eigenvecND[2].setValues(eigenvec[1], 3);
      double tmp = eigenval[1];
      eigenval[1] = eigenval[2];
      eigenval[2] = tmp;
      reverse = !reverse;
      dot1 = dot2;
     } else { 
      eigenvecND[1].setValues(eigenvec[1], 3);
      eigenvecND[2].setValues(eigenvec[2], 3);
     }
     if (dot1 < 0) { 
      eigenvecND[1].mulInside3(-1);
      reverse = !reverse;
     }
     if (reverse) { 
      eigenvecND[2].mulInside3(-1);
     }
    }
   }
   mu[0] = -eigenval[0] / beta;
   mu[1] = -eigenval[1] / beta;
   mu[2] = -eigenval[2] / beta;
   for (int i = 0; i < 3; i++) {
    halfAxes[i] = Math.sqrt(1.0d / mu[i]);
   }
   for (int i = 0; i < 3; i++) {
    diagonal[i] = mu[i];
   }
   diagonal[3] = -1;
   setEigenMatrix(halfAxes[0], halfAxes[1], halfAxes[2]);
   type = QUADRIC_ELLIPSOID;
  }
 }
 protected void findEigenvectors() {
  if (eigenvec == null) {
   eigenvec = new Coords[3];
   for (int i = 0; i < 3; i++) {
    eigenvec[i] = new Coords(3);
   }
  }
  if (DoubleUtil.isRatioEqualTo1(eigenval[0], eigenval[1])) {
   findEigenvectorsMultiplicity1(eigenval[2], eigenvec[2], eigenvec[0], eigenvec[1]);
  } else if (DoubleUtil.isRatioEqualTo1(eigenval[0], eigenval[2])) {
   findEigenvectorsMultiplicity1(eigenval[1], eigenvec[1], eigenvec[2], eigenvec[0]);
  } else if (DoubleUtil.isRatioEqualTo1(eigenval[1], eigenval[2])) {
   findEigenvectorsMultiplicity1(eigenval[0], eigenvec[0], eigenvec[1], eigenvec[2]);
  } else {
   for (int i = 0; i < 2; i++) {
    computeEigenVectorMultiplicity1(matrix, eigenval[i], eigenvec[i]);
   }
   eigenvec[2].setCrossProduct3(eigenvec[0], eigenvec[1]); 
   if (eigenvec[2].isZero()) {
    findEigenvectorsMultiplicity1(eigenval[2], eigenvec[2], eigenvec[0], eigenvec[1]);
   } else {
    for (int i = 0; i < 3; i++) {
     eigenvec[i].normalize();
    }
   }
  }
 }
 private void findEigenvectorsMultiplicity1(double val, Coords v, Coords v0, Coords v1) {
  computeEigenVectorMultiplicity1(matrix, val, v);
  v.normalize();
  completeOrthonormalRatioEqualTo1(v0, v1, v);
 }
 private static void computeEigenVectorMultiplicity1(double[] m, double mu, Coords v) {
  v.set(
    m[5] / mu * (m[1] / mu - 1) - m[4] / mu * m[6] / mu,
    m[6] / mu * (m[0] / mu - 1) - m[4] / mu * m[5] / mu,
    m[4] / mu * m[4] / mu - (m[0] / mu - 1) * (m[1] / mu - 1));
  if (v.isZero()) {
   v.set(
     m[5] / mu * m[6] / mu - m[4] / mu * (m[2] / mu - 1),
     (m[0] / mu - 1) * (m[2] / mu - 1) - m[5] / mu * m[5] / mu,
     m[4] / mu * m[5] / mu - m[6] / mu * (m[0] / mu - 1));
   if (v.isZero()) {
    v.set(1, 0, 0);
   }
  }
 }
 private boolean checkDefined() {
  for (double value : matrix) {
   if (Double.isNaN(value)) {
    return false;
   }
  }
  return true;
 }
 public GeoQuadric3D(GeoQuadric3D quadric) {
  this(quadric.getConstruction());
  set(quadric);
 }
 public Coords getMidpointND() {
  return getMidpoint3D();
 }
 protected void setSphereNDMatrix(Coords M, double r) {
  super.setSphereNDMatrix(M, r);
  volume = 4 * Math.PI * getHalfAxis(0) * getHalfAxis(1) * getHalfAxis(2) / 3;
  diagonal[0] = 1;
  diagonal[1] = 1;
  diagonal[2] = 1;
  diagonal[3] = -r * r;
  eigenMatrix.setOrigin(getMidpoint3D());
  for (int i = 1; i <= 3; i++) {
   eigenMatrix.set(i, i, getHalfAxis(i - 1));
  }
 }
 public void setSphereND(GeoPointND M, GeoSegmentND segment) {
 }
 public void setSphereND(GeoPointND M, GeoPointND P) {
  setSphereNDMatrix(M.getInhomCoordsInD3(), M.distance(P));
 }
 public void setCone(GeoPointND origin, GeoVectorND direction, double angle) {
  defined = origin.isDefined() && !origin.isInfinite();
  double r;
  double c = Math.cos(angle);
  double s = Math.sin(angle);
  if (c < 0 || s < 0) {
   defined = false;
  } else if (DoubleUtil.isZero(c)) {
   defined = false; 
  } else if (DoubleUtil.isZero(s)) {
   defined = false; 
  } else {
   r = s / c;
   setCone(origin.getInhomCoordsInD3(), direction.getCoordsInD3(), null, r, r);
  }
 }
 public void setCone(Coords origin, Coords direction, Coords eigen, double r, double r2) {
  setMidpoint(origin.get());
  updateEigenvectors(direction, eigen);
  halfAxes[0] = r;
  halfAxes[1] = r2;
  halfAxes[2] = 1;
  diagonal[0] = r2 / r;
  diagonal[1] = r / r2;
  diagonal[2] = -r * r2;
  diagonal[3] = 0;
  setMatrixFromEigen();
  setEigenMatrix(halfAxes[0], halfAxes[1], 1);
  type = QUADRIC_CONE;
 }
 private void updateEigenvectors(Coords direction, Coords eigen) {
  eigenvecND[2].setValues(direction, 3);
  if (eigen != null) {
   eigenvecND[0] = eigen.normalize();
   eigenvecND[1] = eigenvecND[2].crossProduct(eigen).normalize();
  } else {
   eigenvecND[2].completeOrthonormal(eigenvecND[0], eigenvecND[1]);
  }
 }
 public void setCylinder(GeoPointND origin, Coords direction, double r0) {
  double r = r0;
  defined = origin.isDefined() && !origin.isInfinite();
  if (DoubleUtil.isZero(r)) {
   r = 0;
  } else if (r < 0) {
   defined = false;
  }
  if (defined) {
   setCylinder(origin.getInhomCoordsInD3(), direction, null, r, r);
  }
 }
 public void setCylinder(Coords origin, Coords direction, Coords eigen, double r, double r2) {
  setCylinder(origin, direction, eigen, r, r2, 1);
 }
 public void setCylinder(
   Coords origin, Coords direction, Coords eigen, double r, double r2, double sgn) {
  setMidpoint(origin.get());
  updateEigenvectors(direction, eigen);
  halfAxes[0] = r;
  halfAxes[1] = r2;
  halfAxes[2] = 1;
  diagonal[0] = r2 / r;
  diagonal[1] = sgn * r / r2;
  diagonal[2] = 0;
  diagonal[3] = -r * r2;
  setMatrixFromEigen();
  setEigenMatrix(halfAxes[0], halfAxes[1], 1);
  this.type = sgn > 0 ? QUADRIC_CYLINDER : QUADRIC_HYPERBOLIC_CYLINDER;
 }
 public void setHyperbolicCylinder(
   Coords origin, Coords direction, Coords eigen, double r, double r2) {
  setCylinder(origin, direction, eigen, r, r2, -1);
 }
 public void setParabolicCylinder(Coords origin, Coords direction, Coords eigen, double r2) {
  setMidpoint(origin.get());
  updateEigenvectors(eigen.crossProduct(direction).normalize(), eigen.normalize());
  halfAxes[0] = 1;
  halfAxes[1] = 1;
  halfAxes[2] = Math.sqrt(r2 * 2);
  diagonal[0] = 0;
  diagonal[1] = 0;
  diagonal[2] = 1; 
  diagonal[3] = 0;
  setMatrixFromEigen(-r2);
  eigenvecND[1] = new Coords(eigenvecND[1].getX(), eigenvecND[1].getY(), eigenvecND[1].getZ(), 0);
  this.setSemiDiagonalizedMatrix();
  this.setEigenMatrix(1, 1, halfAxes[2]);
  this.type = QUADRIC_PARABOLIC_CYLINDER;
 }
 private void setEigenMatrix(double x, double y, double z) {
  eigenMatrix.setOrigin(getMidpoint3D());
  eigenMatrix.setVx(eigenvecND[0].mul(x));
  eigenMatrix.setVy(eigenvecND[1].mul(y));
  eigenMatrix.setVz(eigenvecND[2].mul(z));
 }
 public GeoElement copy() {
  return new GeoQuadric3D(this);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.QUADRIC;
 }
 public String getTypeString() {
  switch (type) {
   case GeoQuadricNDConstants.QUADRIC_SPHERE:
    return "Sphere";
   case GeoQuadricNDConstants.QUADRIC_CYLINDER:
    return "Cylinder";
   case GeoQuadricNDConstants.QUADRIC_CONE:
    return "Cone";
   case GeoQuadricNDConstants.QUADRIC_ELLIPSOID:
    return "Ellipsoid";
   case GeoQuadricNDConstants.QUADRIC_HYPERBOLOID_ONE_SHEET:
    return "HyperboloidOneSheet";
   case GeoQuadricNDConstants.QUADRIC_HYPERBOLOID_TWO_SHEETS:
    return "HyperboloidTwoSheets";
   case GeoQuadricNDConstants.QUADRIC_PARABOLOID:
    return "Paraboloid";
   case GeoQuadricNDConstants.QUADRIC_HYPERBOLIC_PARABOLOID:
    return "HyperbolicParaboloid";
   case GeoQuadricNDConstants.QUADRIC_PARABOLIC_CYLINDER:
    return "ParabolicCylinder";
   case GeoQuadricNDConstants.QUADRIC_HYPERBOLIC_CYLINDER:
    return "HyperbolicCylinder";
   case GeoQuadricNDConstants.QUADRIC_EMPTY:
    return "EmptySet";
   case GeoQuadricNDConstants.QUADRIC_SINGLE_POINT:
    return "Point";
   case GeoQuadricNDConstants.QUADRIC_PLANE:
    return "Plane";
   case GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES:
    return "IntersectingPlanes";
   case GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES:
    return "ParallelPlanes";
   case GeoQuadricNDConstants.QUADRIC_LINE:
    return "Line";
   case GeoQuadricNDConstants.QUADRIC_NOT_CLASSIFIED:
   default:
    return "Quadric";
  }
 }
 public String getTypeStringForAlgebraView() {
  if (getParentAlgorithm() instanceof AlgoDependentQuadric3D) {
   return "Quadric";
  }
  return getTypeString();
 }
 public ExtendedBoolean isEqualExtended(GeoElementND geo) {
  if (geo instanceof GeoQuadric3D) {
   return ExtendedBoolean.newExtendedBoolean(hasEqualMatrix((GeoQuadric3D) geo));
  }
  return ExtendedBoolean.FALSE;
 }
 public void set(GeoElementND geo) {
  GeoQuadric3D quadric = (GeoQuadric3D) geo;
  equationForm = quadric.equationForm;
  final boolean typeChanged = type != quadric.type;
  type = quadric.type;
  for (int i = 0; i < 10; i++) {
   matrix[i] = quadric.matrix[i]; 
  }
  for (int i = 0; i < 3; i++) {
   eigenvecND[i].set(quadric.getEigenvec3D(i));
   halfAxes[i] = quadric.halfAxes[i];
  }
  for (int i = 0; i < 4; i++) {
   diagonal[i] = quadric.diagonal[i];
  }
  setMidpoint(quadric.getMidpoint().get());
  eigenMatrix.set(quadric.eigenMatrix);
  defined = quadric.defined;
  volume = quadric.volume;
  if (type == GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PLANE) {
   getPlanes();
   planes[0].set(quadric.planes[0]);
   if (type != GeoQuadricNDConstants.QUADRIC_PLANE) {
    planes[1].set(quadric.planes[1]);
   }
  }
  if (type == GeoQuadricNDConstants.QUADRIC_LINE) {
   getLine().set(quadric.line);
  }
  if (kernel.getConstruction().isFileLoading() && typeChanged && type == QUADRIC_NOT_CLASSIFIED) {
   classifyQuadric();
  }
  super.set(geo);
  if (typeChanged) {
   kernel.notifyTypeChanged(this);
  }
 }
 public void showUndefinedInAlgebraView(boolean flag) {
  showUndefinedInAlgebraView = flag;
 }
 public boolean showInAlgebraView() {
  return isDefined() || showUndefinedInAlgebraView;
 }
 protected boolean showInEuclidianView() {
  return type != GeoQuadricNDConstants.QUADRIC_NOT_CLASSIFIED
    && type != GeoQuadricNDConstants.QUADRIC_EMPTY;
 }
 protected StringBuilder buildValueString(StringTemplate tpl) {
  if (!isDefined()) {
   return new StringBuilder("?");
  }
  StringBuilder sbToValueString = new StringBuilder();
  if (getDefinition() != null && (getEquationForm() == Form.USER)) {
   return sbToValueString.append(getDefinition().toString(tpl));
  }
  switch (type) {
   case QUADRIC_SPHERE:
    if (getEquationForm() == Form.IMPLICIT) {
     return buildImplicitEquation(tpl);
    }
    buildSphereNDString(sbToValueString, tpl);
    break;
   case QUADRIC_CONE:
   case QUADRIC_CYLINDER:
   default:
    return buildImplicitEquation(tpl);
  }
  return sbToValueString;
 }
 private StringBuilder buildImplicitEquation(StringTemplate tpl) {
  double[] coeffs = new double[10];
  coeffs[0] = matrix[0]; 
  coeffs[1] = matrix[1]; 
  coeffs[2] = matrix[2]; 
  coeffs[9] = matrix[3]; 
  coeffs[3] = 2 * matrix[4]; 
  coeffs[4] = 2 * matrix[5]; 
  coeffs[5] = 2 * matrix[6]; 
  coeffs[6] = 2 * matrix[7]; 
  coeffs[7] = 2 * matrix[8]; 
  coeffs[8] = 2 * matrix[9]; 
  String[] vars = tpl.getStringType().isGiac() ? vars3DCAS : vars3D;
  return kernel.buildImplicitEquation(coeffs, vars, true, true, tpl, true);
 }
 public boolean isFillable() {
  return true;
 }
 public boolean isGeoElement3D() {
  return true;
 }
 public boolean hasFillType() {
  return false;
 }
 public void evaluatePoint(double u, double v, Coords point) {
  switch (type) {
   case QUADRIC_SPHERE:
   case QUADRIC_ELLIPSOID:
    point.setMulPoint(
      eigenMatrix, Math.cos(u) * Math.cos(v), Math.sin(u) * Math.cos(v), Math.sin(v));
    break;
   case QUADRIC_HYPERBOLOID_ONE_SHEET:
    if (getHalfAxis(2) == Double.POSITIVE_INFINITY) {
     point.setMulPoint(eigenMatrix, Math.cos(u), Math.sin(u), v);
    } else {
     double ch = Math.cosh(DrawConic3D.asinh(v));
     point.setMulPoint(eigenMatrix, Math.cos(u) * ch, Math.sin(u) * ch, v);
    }
    break;
   case QUADRIC_HYPERBOLOID_TWO_SHEETS:
    double t, ch;
    if (v < -1) {
     t = -DrawConic3D.acosh(-v);
     ch = v;
    } else if (v < 0) {
     t = 0;
     ch = -1;
    } else if (v < 1) {
     t = 0;
     ch = 1;
    } else {
     t = DrawConic3D.acosh(v);
     ch = v;
    }
    double sh = Math.sinh(Math.abs(t));
    point.setMulPoint(eigenMatrix, Math.cos(u) * sh, Math.sin(u) * sh, ch);
    break;
   case QUADRIC_PARABOLOID:
    point.setMulPoint(eigenMatrix, Math.cos(u) * v, Math.sin(u) * v, v * v);
    break;
   case QUADRIC_HYPERBOLIC_PARABOLOID:
    point.setMulPoint(eigenMatrix, u, v, getHalfAxis(0) * u * u + getHalfAxis(1) * v * v);
    break;
   case QUADRIC_PARABOLIC_CYLINDER:
    point.setMulPoint(eigenMatrix, v * v, u, v);
    break;
   case QUADRIC_HYPERBOLIC_CYLINDER:
    double s;
    double c;
    if (u < 1) {
     s = PathNormalizer.infFunction(u);
     c = -Math.cosh(DrawConic3D.asinh(s));
    } else {
     s = PathNormalizer.infFunction(u - 2);
     c = Math.cosh(DrawConic3D.asinh(s));
    }
    point.setMulPoint(eigenMatrix, c, s, v);
    break;
   case QUADRIC_CONE:
    double v2 = Math.abs(v);
    point.setMulPoint(eigenMatrix, Math.cos(u) * v2, Math.sin(u) * v2, v);
    break;
   case QUADRIC_CYLINDER:
    point.setMulPoint(eigenMatrix, Math.cos(u), Math.sin(u), v);
    break;
   case QUADRIC_SINGLE_POINT:
    point.set(getMidpoint3D());
    break;
   case QUADRIC_PARALLEL_PLANES:
   case QUADRIC_INTERSECTING_PLANES:
    if (u < 1) { 
     point.set(planes[0].getCoordSys().getPoint(PathNormalizer.infFunction(u), v));
    } else { 
     point.set(planes[1].getCoordSys().getPoint(PathNormalizer.infFunction(u - 2), v));
    }
    break;
   case QUADRIC_PLANE:
    point.set(planes[0].getCoordSys().getPoint(u, v));
    break;
   case QUADRIC_LINE:
    point.set(line.getPoint(u));
    break;
   default:
    Log.error(this + " has wrong type : " + type);
    break;
  }
 }
 public Coords evaluateNormal(double u, double v) {
  Coords n;
  switch (type) {
   case QUADRIC_SPHERE:
   case QUADRIC_ELLIPSOID:
    double r0 = getHalfAxis(0);
    double r1 = getHalfAxis(1);
    double r2 = getHalfAxis(2);
    n = new Coords(4);
    n.setMul(getEigenvec3D(0), r1 * r2 * Math.cos(u) * Math.cos(v));
    tmpCoords.setMul(getEigenvec3D(1), r0 * r2 * Math.sin(u) * Math.cos(v));
    n.addInside(tmpCoords);
    tmpCoords.setMul(getEigenvec3D(2), r0 * r1 * Math.sin(v));
    n.addInside(tmpCoords);
    n.normalize();
    return n;
   case QUADRIC_HYPERBOLOID_ONE_SHEET:
    r0 = getHalfAxis(0);
    r1 = getHalfAxis(1);
    r2 = getHalfAxis(2);
    n = new Coords(4);
    double ch = Math.cosh(DrawConic3D.asinh(v));
    n.setMul(getEigenvec3D(0), r1 * r2 * Math.cos(u) * ch);
    tmpCoords.setMul(getEigenvec3D(1), r0 * r2 * Math.sin(u) * ch);
    n.addInside(tmpCoords);
    tmpCoords.setMul(getEigenvec3D(2), -r0 * r1 * v);
    n.addInside(tmpCoords);
    n.normalize();
    return n;
   case QUADRIC_HYPERBOLOID_TWO_SHEETS:
    r0 = getHalfAxis(0);
    r1 = getHalfAxis(1);
    r2 = getHalfAxis(2);
    n = new Coords(4);
    double t;
    if (v < -1) {
     t = -DrawConic3D.acosh(-v);
     ch = v;
    } else if (v < 0) {
     t = 0;
     ch = -1;
    } else if (v < 1) {
     t = 0;
     ch = 1;
    } else {
     t = DrawConic3D.acosh(v);
     ch = v;
    }
    double sh = Math.sinh(Math.abs(t));
    n.setMul(getEigenvec3D(0), r1 * r2 * Math.cos(u) * sh);
    tmpCoords.setMul(getEigenvec3D(1), r0 * r2 * Math.sin(u) * sh);
    n.addInside(tmpCoords);
    tmpCoords.setMul(getEigenvec3D(2), -r0 * r1 * ch);
    n.addInside(tmpCoords);
    n.normalize();
    return n;
   case QUADRIC_PARABOLOID:
    r0 = getHalfAxis(0);
    r1 = getHalfAxis(1);
    r2 = getHalfAxis(2);
    n = new Coords(4);
    n.setMul(getEigenvec3D(0), 2 * r1 * r2 * Math.cos(u) * v);
    tmpCoords.setMul(getEigenvec3D(1), 2 * r0 * r2 * Math.sin(u) * v);
    n.addInside(tmpCoords);
    tmpCoords.setMul(getEigenvec3D(2), -r0 * r1);
    n.addInside(tmpCoords);
    n.normalize();
    return n;
   case QUADRIC_HYPERBOLIC_PARABOLOID:
    r0 = getHalfAxis(0);
    r1 = getHalfAxis(1);
    n = new Coords(4);
    n.setMul(getEigenvec3D(0), 2 * r0 * u);
    tmpCoords.setMul(getEigenvec3D(1), 2 * r1 * v);
    n.addInside(tmpCoords);
    tmpCoords.setMul(getEigenvec3D(2), -1);
    n.addInside(tmpCoords);
    n.normalize();
    return n;
   case QUADRIC_PARABOLIC_CYLINDER:
    r2 = getHalfAxis(2);
    n = new Coords(4);
    n.setMul(getEigenvec3D(0), -r2);
    tmpCoords.setMul(getEigenvec3D(2), 2 * v);
    n.addInside(tmpCoords);
    n.normalize();
    return n;
   case QUADRIC_HYPERBOLIC_CYLINDER:
    r0 = getHalfAxis(0);
    r1 = getHalfAxis(1);
    n = new Coords(4);
    double s;
    if (u < 1) {
     s = PathNormalizer.infFunction(u);
     n.setMul(getEigenvec3D(0), -r1 * Math.cosh(DrawConic3D.asinh(s)));
    } else {
     s = PathNormalizer.infFunction(u - 2);
     n.setMul(getEigenvec3D(0), r1 * Math.cosh(DrawConic3D.asinh(s)));
    }
    tmpCoords.setMul(getEigenvec3D(1), -r0 * s);
    n.addInside(tmpCoords);
    n.normalize();
    return n;
   case QUADRIC_CONE:
    r0 = getHalfAxis(0);
    r1 = getHalfAxis(1);
    double rr;
    if (v < 0) {
     rr = r0 * r1;
    } else {
     rr = -r0 * r1;
    }
    n = new Coords(4);
    n.setMul(getEigenvec3D(0), r1 * Math.cos(u));
    tmpCoords.setMul(getEigenvec3D(1), r0 * Math.sin(u));
    n.addInside(tmpCoords);
    tmpCoords.setMul(getEigenvec3D(2), rr);
    n.addInside(tmpCoords);
    n.normalize();
    return n;
   case QUADRIC_CYLINDER:
    r0 = getHalfAxis(0);
    r1 = getHalfAxis(1);
    n = new Coords(4);
    n.setMul(getEigenvec3D(0), r1 * Math.cos(u));
    tmpCoords.setMul(getEigenvec3D(1), r0 * Math.sin(u));
    n.addInside(tmpCoords);
    n.normalize();
    return n;
   case QUADRIC_PARALLEL_PLANES:
    return planes[0].getDirectionInD3();
   case QUADRIC_INTERSECTING_PLANES:
    if (u > 1) {
     return planes[1].getDirectionInD3();
    }
    return planes[0].getDirectionInD3();
   default:
    return null;
  }
 }
 public double getMinParameter(int index) {
  switch (type) {
   case QUADRIC_SPHERE:
   case QUADRIC_ELLIPSOID:
    switch (index) {
     case 0: 
     default:
      return 0;
     case 1: 
      return -Math.PI / 2;
    }
   case QUADRIC_HYPERBOLOID_ONE_SHEET:
   case QUADRIC_HYPERBOLOID_TWO_SHEETS:
    switch (index) {
     case 0: 
     default:
      return 0;
     case 1: 
      return Double.NEGATIVE_INFINITY;
    }
   case QUADRIC_PARABOLOID:
    switch (index) {
     case 0: 
     default:
      return 0;
     case 1: 
      return 0;
    }
   case QUADRIC_PARABOLIC_CYLINDER:
    switch (index) {
     case 0: 
     default:
      return Double.NEGATIVE_INFINITY;
     case 1: 
      return 0;
    }
   case QUADRIC_HYPERBOLIC_CYLINDER:
    switch (index) {
     case 0: 
     default:
      return -1;
     case 1: 
      return Double.NEGATIVE_INFINITY;
    }
   case QUADRIC_HYPERBOLIC_PARABOLOID:
    switch (index) {
     case 0: 
     default:
      return Double.NEGATIVE_INFINITY;
     case 1: 
      return Double.NEGATIVE_INFINITY;
    }
   case QUADRIC_CONE:
   case QUADRIC_CYLINDER:
    switch (index) {
     case 0: 
     default:
      return 0;
     case 1: 
      return Double.NEGATIVE_INFINITY;
    }
   default:
    return 0;
  }
 }
 public double getMaxParameter(int index) {
  switch (type) {
   case QUADRIC_SPHERE:
   case QUADRIC_ELLIPSOID:
    switch (index) {
     case 0: 
     default:
      return 2 * Math.PI;
     case 1: 
      return Math.PI / 2;
    }
   case QUADRIC_HYPERBOLOID_ONE_SHEET:
   case QUADRIC_HYPERBOLOID_TWO_SHEETS:
    switch (index) {
     case 0: 
     default:
      return 2 * Math.PI;
     case 1: 
      return Double.POSITIVE_INFINITY;
    }
   case QUADRIC_PARABOLOID:
   case QUADRIC_CONE:
   case QUADRIC_CYLINDER:
    switch (index) {
     case 0: 
     default:
      return 2 * Math.PI;
     case 1: 
      return Double.POSITIVE_INFINITY;
    }
   case QUADRIC_PARABOLIC_CYLINDER:
   case QUADRIC_HYPERBOLIC_PARABOLOID:
    switch (index) {
     case 0: 
     default:
      return Double.POSITIVE_INFINITY;
     case 1: 
      return Double.POSITIVE_INFINITY;
    }
   case QUADRIC_HYPERBOLIC_CYLINDER:
    switch (index) {
     case 0: 
     default:
      return 3;
     case 1: 
      return Double.POSITIVE_INFINITY;
    }
   default:
    return 0;
  }
 }
 public Coords getLabelPosition() {
  return Coords.O; 
 }
 public Coords getMainDirection() {
  return Coords.VZ;
 }
 public boolean isRegion() {
  return true;
 }
 public boolean isRegion3D() {
  return true;
 }
 protected void getNormalProjectionParameters(Coords coords, double[] parameters) {
  Coords eigenCoords = eigenMatrix.solve(coords);
  double x = eigenCoords.getX();
  double y = eigenCoords.getY();
  double z = eigenCoords.getZ();
  switch (getType()) {
   case QUADRIC_SPHERE:
   case QUADRIC_ELLIPSOID: 
    parameters[0] = Math.atan2(y, x);
    double r = Math.sqrt(x * x + y * y);
    parameters[1] = Math.atan2(z, r);
    break;
   case QUADRIC_HYPERBOLOID_ONE_SHEET: 
    parameters[0] = Math.atan2(y, x);
    parameters[1] = z;
    break;
   case QUADRIC_HYPERBOLOID_TWO_SHEETS: 
    parameters[0] = Math.atan2(y, x);
    parameters[1] = z;
    break;
   case QUADRIC_PARABOLOID: 
    double a = Math.atan2(y, x);
    if (a < 0) {
     a += 2 * Math.PI;
    }
    parameters[0] = a;
    if (z < 0) {
     parameters[1] = 0;
    } else {
     parameters[1] = Math.sqrt(z);
    }
    break;
   case QUADRIC_HYPERBOLIC_PARABOLOID:
    parameters[0] = x;
    parameters[1] = y;
    break;
   case QUADRIC_PARABOLIC_CYLINDER: 
    parameters[0] = y;
    if (x < 0) {
     parameters[1] = 0;
    } else {
     parameters[1] = Math.sqrt(x);
     if (z < 0) {
      parameters[1] *= -1;
     }
    }
    break;
   case QUADRIC_HYPERBOLIC_CYLINDER: 
    parameters[0] = PathNormalizer.inverseInfFunction(y);
    if (x > 0) {
     parameters[0] += 2;
    }
    parameters[1] = z;
    break;
   case QUADRIC_CONE:
   case QUADRIC_CYLINDER: 
    parameters[0] = Math.atan2(y, x);
    parameters[1] = z;
    break;
   case QUADRIC_PARALLEL_PLANES:
   case QUADRIC_INTERSECTING_PLANES:
    coords.projectPlaneInPlaneCoords(planes[0].getCoordSys().getMatrixOrthonormal(), tmpCoords);
    parameters[0] = PathNormalizer.inverseInfFunction(tmpCoords.getX());
    parameters[1] = tmpCoords.getY();
    break;
   case QUADRIC_PLANE:
    coords.projectPlaneInPlaneCoords(planes[0].getCoordSys().getMatrixOrthonormal(), tmpCoords);
    parameters[0] = PathNormalizer.inverseInfFunction(tmpCoords.getX());
    parameters[1] = tmpCoords.getY();
    break;
   case QUADRIC_LINE:
    coords.projectLine(
      line.getStartInhomCoords(), line.getDirectionInD3(), tmpCoords, parameters);
    parameters[1] = 0;
    break;
   default:
    Log.error("Missing type -- type: " + getType());
    break;
  }
 }
 public Coords[] getNormalProjection(Coords coords) {
  getNormalProjectionParameters(coords, tmpDouble2);
  return new Coords[] {getPoint(tmpDouble2[0], tmpDouble2[1]), new Coords(tmpDouble2)};
 }
 public void getNormalProjection(Coords coords, Coords ret, double[] parameters) {
  getNormalProjectionParameters(coords, parameters);
  evaluatePoint(parameters[0], parameters[1], ret);
 }
 protected Coords[] getProjection(
   Coords willingCoords, Coords willingDirection, double t1, double t2) {
  if (tmpCoords6 == null) {
   tmpCoords6 = Coords.createInhomCoorsInD3();
  }
  tmpCoords6.setMul3(willingDirection, t1);
  tmpCoords6.setAdd3(tmpCoords6, willingCoords);
  tmpCoords6.setW(willingCoords.getW());
  return getNormalProjection(tmpCoords6);
 }
 public Coords getPoint(double u, double v, Coords coords) {
  evaluatePoint(u, v, coords);
  return coords;
 }
 public Coords getPoint(double u, double v) {
  return getPoint(u, v, new Coords(4));
 }
 protected Coords getPointInRegion(double u, double v) {
  return getPoint(u, v);
 }
 public Coords[] getProjection(Coords oldCoords, Coords willingCoords, Coords willingDirection) {
  CoordMatrix qm = getSymmetricMatrix();
  if (tmpMatrix4x2 == null) {
   tmpMatrix4x2 = new CoordMatrix(4, 2);
  }
  tmpMatrix4x2.setVx(willingDirection);
  tmpMatrix4x2.setOrigin(willingCoords);
  if (tmpMatrix2x4 == null) {
   tmpMatrix2x4 = new CoordMatrix(2, 4);
  }
  tmpMatrix4x2.transposeCopy(tmpMatrix2x4);
  CoordMatrix sm = tmpMatrix2x4.mul(qm).mul(tmpMatrix4x2);
  double a = sm.get(1, 1);
  double b = sm.get(1, 2);
  double c = sm.get(2, 2);
  if (DoubleUtil.isEpsilon(a, b, c)) { 
   double t = c / -b;
   return getProjection(willingCoords, willingDirection, t, t);
  }
  double Delta = b * b - a * c;
  if (Delta >= 0) {
   double t1 = (-b - Math.sqrt(Delta)) / a;
   double t2 = (-b + Math.sqrt(Delta)) / a;
   if (a > 0) {
    return getProjection(willingCoords, willingDirection, t1, t2);
   }
   return getProjection(willingCoords, willingDirection, t2, t1);
  }
  tmpCoords.setMul3(willingDirection, -b / a);
  tmpCoords.setAdd3(tmpCoords, willingCoords);
  tmpCoords.setW(1);
  return getNormalProjection(tmpCoords);
 }
 public void getProjections(
   Coords willingCoords,
   Coords willingDirection,
   Coords p1,
   double[] parameters1,
   Coords p2,
   double[] parameters2) {
  CoordMatrix qm = getSymmetricMatrix();
  if (tmpMatrix4x2 == null) {
   tmpMatrix4x2 = new CoordMatrix(4, 2);
  }
  tmpMatrix4x2.setVx(willingDirection);
  tmpMatrix4x2.setOrigin(willingCoords);
  if (tmpMatrix2x4 == null) {
   tmpMatrix2x4 = new CoordMatrix(2, 4);
  }
  tmpMatrix4x2.transposeCopy(tmpMatrix2x4);
  CoordMatrix sm = tmpMatrix2x4.mul(qm).mul(tmpMatrix4x2);
  double a = sm.get(1, 1);
  double b = sm.get(1, 2);
  double c = sm.get(2, 2);
  if (tmpEqn == null) {
   tmpEqn = new double[3];
  }
  tmpEqn[0] = c;
  tmpEqn[1] = 2 * b;
  tmpEqn[2] = a;
  int nRoots = EquationSolver.solveQuadratic(tmpEqn);
  if (nRoots > 0) {
   double t1, t2;
   if (tmpEqn[0] < tmpEqn[1]) {
    t1 = tmpEqn[0];
    t2 = tmpEqn[1];
   } else {
    t1 = tmpEqn[1];
    t2 = tmpEqn[0];
   }
   tmpCoords.setAdd(willingCoords, tmpCoords.setMul(willingDirection, t1));
   getNormalProjectionParameters(tmpCoords, parameters1);
   checkParameters(parameters1);
   evaluatePoint(parameters1[0], parameters1[1], p1);
   tmpCoords.setAdd(willingCoords, tmpCoords.setMul(willingDirection, t2));
   getNormalProjectionParameters(tmpCoords, parameters2);
   checkParameters(parameters2);
   evaluatePoint(parameters2[0], parameters2[1], p2);
  } else {
   getNormalProjection(
     tmpCoords.setAdd(willingCoords, tmpCoords.setMul(willingDirection, -b / a)),
     p1,
     parameters1);
   p2.setUndefined();
  }
 }
 public void resetLastHitParameters() {
  lastHitParameters = null;
 }
 public void setLastHitParameters(double[] parameters) {
  lastHitParameters = parameters;
 }
 private boolean hasLastHitParameters() {
  return lastHitParameters != null;
 }
 protected boolean checkParameters(double[] parameters) {
  return true;
 }
 public boolean isInRegion(GeoPointND P) {
  return isInRegion(P.getCoordsInD3());
 }
 public boolean isInRegion(Coords coords) {
  return DoubleUtil.isZero(coords.dotproduct(getSymmetricMatrix().mul(coords)));
 }
 public boolean isInRegion(double x0, double y0) {
  return false;
 }
 private Coords getDirectionToCenter(Coords source) {
  switch (getType()) {
   case QUADRIC_SPHERE:
   case QUADRIC_ELLIPSOID:
    tmpCoords.setSub(getMidpoint3D(), source);
    if (tmpCoords.isZero()) {
     return getEigenvec3D(0).copyVector();
    }
    return tmpCoords;
   case QUADRIC_HYPERBOLOID_ONE_SHEET:
   case QUADRIC_HYPERBOLOID_TWO_SHEETS:
   case QUADRIC_PARABOLOID:
    source.projectLine(getMidpoint3D(), getEigenvec3D(2), tmpCoords);
    tmpCoords.setSub(tmpCoords, source);
    if (tmpCoords.isZero()) {
     return getEigenvec3D(0).copyVector();
    }
    return tmpCoords;
   case QUADRIC_CONE:
   case QUADRIC_CYLINDER:
    eigenMatrix.pivotDegenerate(tmpCoords, source);
    if (DoubleUtil.isZero(tmpCoords.getX()) && DoubleUtil.isZero(tmpCoords.getY())) {
     return getEigenvec3D(0).copyVector();
    }
    tmpCoords.setZ(0);
    tmpCoords.setW(0);
    if (tmpCoords2 == null) {
     tmpCoords2 = new Coords(4);
    }
    tmpCoords2.setMul(eigenMatrix, tmpCoords);
    tmpCoords2.normalize();
    tmpCoords2.mulInside(-1);
    return tmpCoords2;
   case QUADRIC_PARABOLIC_CYLINDER:
    tmpCoords.setSub(getMidpoint3D(), source);
    if (tmpCoords.dotproduct(getEigenvec3D(2)) > 0) {
     return getEigenvec3D(2).copyVector(); 
    }
    return getEigenvec3D(2).mul(-1); 
   case QUADRIC_HYPERBOLIC_CYLINDER:
    tmpCoords.setSub(getMidpoint3D(), source);
    if (tmpCoords.dotproduct(getEigenvec3D(0)) > 0) {
     return getEigenvec3D(0).copyVector(); 
    }
    return getEigenvec3D(0).mul(-1); 
   case QUADRIC_HYPERBOLIC_PARABOLOID:
    return getEigenvec3D(2).copyVector(); 
   default:
    return null;
  }
 }
 public void pointChangedForRegion(GeoPointND P) {
  GeoPoint3D p1 = (GeoPoint3D) P;
  RegionParameters rp = P.getRegionParameters();
  rp.setRegionType(type);
  if (type == QUADRIC_SINGLE_POINT) {
   p1.setCoords(getMidpoint3D(), false);
   p1.updateCoords();
   return;
  }
  if (type == QUADRIC_PLANE) {
   p1.updateCoords2D(planes[0], true);
   P.updateCoordsFrom2D(false, planes[0].getCoordSys());
   rp.setT1(PathNormalizer.inverseInfFunction(rp.getT1()));
   return;
  }
  if (type == QUADRIC_LINE) {
   double t = line.getParamOnLine(P);
   P.getRegionParameters().setT1(t);
   if (Double.isNaN(P.getRegionParameters().getT2())) {
    P.getRegionParameters().setT2(0);
   }
   P.setCoords(line.getPoint(t), false);
   return;
  }
  if (hasLastHitParameters()) {
   rp.setT1(lastHitParameters[0]);
   rp.setT2(lastHitParameters[1]);
   rp.setNormal(evaluateNormal(rp.getT1(), rp.getT2()));
   evaluatePoint(rp.getT1(), rp.getT2(), p1.getCoords());
   p1.updateCoords();
   p1.setWillingCoordsUndefined();
   p1.setWillingDirectionUndefined();
   resetLastHitParameters();
  } else {
   if (type == QUADRIC_PARALLEL_PLANES || type == QUADRIC_INTERSECTING_PLANES) {
    pointChangedForPlanarRegion(p1, rp);
    return;
   }
   Coords willingCoords;
   if (p1.hasWillingCoords()) {
    willingCoords = p1.getWillingCoords().copyVector();
    p1.setWillingCoordsUndefined();
   } else {
    willingCoords = P.getCoordsInD3();
   }
   Coords willingDirection;
   if (p1.hasWillingDirection()) {
    willingDirection = p1.getWillingDirection().copyVector();
    p1.setWillingDirectionUndefined();
   } else {
    willingDirection = getDirectionToCenter(willingCoords);
   }
   Coords[] coords = getProjection(null, willingCoords, willingDirection);
   rp.setT1(coords[1].get(1));
   rp.setT2(coords[1].get(2));
   rp.setNormal(evaluateNormal(coords[1].get(1), coords[1].get(2)));
   p1.setCoords(coords[0], false);
   p1.updateCoords();
  }
 }
 private void pointChangedForPlanarRegion(GeoPoint3D p1, RegionParameters rp) {
  Coords coords, direction;
  if (p1.hasWillingCoords()) { 
   coords = p1.getWillingCoords();
  } else {
   coords = p1.getCoords();
  }
  GeoPlane3D plane = planes[0];
  CoordMatrix planeMatrix = plane.getCoordSys().getMatrixOrthonormal();
  if (!p1.hasWillingDirection()) { 
   direction = planeMatrix.getVz();
  } else { 
   direction = p1.getWillingDirection();
  }
  coords.projectPlaneInPlaneCoords(
    planeMatrix.getVx(), planeMatrix.getVy(), direction, planeMatrix.getOrigin(), tmpCoords);
  double t1Shift = 0;
  if (!DoubleUtil.isZero(tmpCoords.getZ())) {
   plane = planes[1];
   planeMatrix = plane.getCoordSys().getMatrixOrthonormal();
   if (!p1.hasWillingDirection()) { 
    direction = planeMatrix.getVz();
   }
   coords.projectPlaneInPlaneCoords(
     planeMatrix.getVx(), planeMatrix.getVy(), direction, planeMatrix.getOrigin(), tmpCoords);
   t1Shift = 2;
  }
  p1.setCoords(plane.getPoint(tmpCoords.getX(), tmpCoords.getY(), new Coords(4)), false);
  rp.setT1(PathNormalizer.inverseInfFunction(tmpCoords.getX()) + t1Shift);
  rp.setT2(tmpCoords.getY());
  rp.setNormal(plane.getDirectionInD3());
  p1.setWillingCoordsUndefined();
  p1.setWillingDirectionUndefined();
 }
 public void regionChanged(GeoPointND P) {
  if (!getKernel().usePathAndRegionParameters(P) || P.getRegionParameters().isNaN()) {
   pointChangedForRegion(P);
   return;
  }
  RegionParameters rp = P.getRegionParameters();
  if (P.isDefined() && !compatibleType(rp.getRegionType())) {
   pointChangedForRegion(P);
   return;
  }
  GeoPoint3D p1 = (GeoPoint3D) P;
  if (type == QUADRIC_SINGLE_POINT) {
   p1.setCoords(getMidpoint3D(), false);
   p1.updateCoords();
   return;
  }
  Coords coords = getPointInRegion(rp.getT1(), rp.getT2());
  p1.setCoords(coords, false);
  p1.updateCoords();
 }
 private boolean compatibleType(int regionType) {
  return type == GeoQuadricNDConstants.QUADRIC_EMPTY
    || regionType == GeoQuadricNDConstants.QUADRIC_EMPTY
    || type == regionType;
 }
 public void translate(Coords v) {
  Coords m = getMidpoint3D();
  m.addInside(v);
  setMidpoint(m.get());
  CoordMatrix sm = getSymmetricMatrix();
  CoordMatrix tm = CoordMatrix.identity(4);
  tm.subToOrigin(v);
  setMatrix(tm.transposeCopy().mul(sm).mul(tm));
  eigenMatrix.setOrigin(m);
  if (type == GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PLANE) {
   planes[0].translate(v);
   if (type != GeoQuadricNDConstants.QUADRIC_PLANE) {
    planes[1].translate(v);
   }
  }
  else if (type == GeoQuadricNDConstants.QUADRIC_LINE) {
   line.translate(v);
  }
 }
 public boolean isTranslateable() {
  return true;
 }
 public void rotate(NumberValue r, GeoPointND S) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  CoordMatrix4x4.rotation4x4(r.getDouble(), S.getInhomCoordsInD3(), tmpMatrix4x4);
  matrixTransform(tmpMatrix4x4);
  transformDegenerate(el -> rotate(r, S));
 }
 public void rotate(NumberValue r) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  CoordMatrix4x4.rotation4x4(r.getDouble(), tmpMatrix4x4);
  matrixTransform(tmpMatrix4x4);
  transformDegenerate(el -> el.rotate(r));
 }
 private void transformDegenerate(Consumer<MatrixTransformable> transform) {
  if (type == GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PLANE) {
   transform.accept(planes[0]);
   if (type != GeoQuadricNDConstants.QUADRIC_PLANE) {
    transform.accept(planes[1]);
   }
  }
  else if (type == GeoQuadricNDConstants.QUADRIC_LINE) {
   transform.accept(line);
  }
 }
 private void matrixTransform(CoordMatrix4x4 tm) {
  eigenMatrix = tm.mul(eigenMatrix);
  setMidpoint(eigenMatrix.getOrigin().get());
  for (int i = 0; i < 3; i++) {
   eigenvecND[i] = tm.mul(eigenvecND[i]);
  }
  CoordMatrix tmInv = tm.inverse();
  setMatrix(tmInv.transposeCopy().mul(getSymmetricMatrix()).mul(tmInv));
 }
 public void rotate(NumberValue r, Coords S, GeoDirectionND orientation) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  CoordMatrix4x4.rotation4x4(
    orientation.getDirectionInD3().normalized(), r.getDouble(), S, tmpMatrix4x4);
  matrixTransform(tmpMatrix4x4);
  if (type == GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PLANE) {
   planes[0].rotate(r, S, orientation);
   if (type != GeoQuadricNDConstants.QUADRIC_PLANE) {
    planes[1].rotate(r, S, orientation);
   }
  }
  else if (type == GeoQuadricNDConstants.QUADRIC_LINE) {
   line.rotate(r, S, orientation);
  }
 }
 public void mirror(Coords point) {
  eigenMatrix.mulInside(-1);
  eigenMatrix.addToOrigin(point.mul(2));
  setMidpoint(eigenMatrix.getOrigin().get());
  for (int i = 0; i < 3; i++) {
   eigenvecND[i].mulInside(-1);
  }
  setMatrixFromEigen();
  if (type == GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PLANE) {
   planes[0].mirror(point);
   if (type != GeoQuadricNDConstants.QUADRIC_PLANE) {
    planes[1].mirror(point);
   }
  }
  else if (type == GeoQuadricNDConstants.QUADRIC_LINE) {
   line.mirror(point);
  }
 }
 public void mirror(GeoLineND mirrorLine) {
  Coords point = mirrorLine.getStartInhomCoords();
  Coords direction = mirrorLine.getDirectionInD3().normalized();
  Coords mp = getMidpoint3D();
  mp.projectLine(point, direction, tmpCoords, null);
  mp.mulInside(-1);
  mp.addInsideMul(tmpCoords, 2);
  setMidpoint(mp.get());
  for (int i = 0; i < 3; i++) {
   Coords v = eigenvecND[i];
   double a = 2 * v.dotproduct(direction);
   v.mulInside(-1);
   v.addInsideMul(direction, a);
  }
  setMatrixFromEigen();
  setEigenMatrix(getHalfAxis(0), getHalfAxis(1), getHalfAxis(2));
  if (type == GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PLANE) {
   planes[0].mirror(mirrorLine);
   if (type != GeoQuadricNDConstants.QUADRIC_PLANE) {
    planes[1].mirror(mirrorLine);
   }
  }
  else if (type == GeoQuadricNDConstants.QUADRIC_LINE) {
   this.line.mirror(mirrorLine);
  }
 }
 public void mirror(GeoCoordSys2D plane) {
  Coords vn = plane.getDirectionInD3().normalized();
  Coords mp = getMidpoint3D();
  mp.projectPlane(plane.getCoordSys().getMatrixOrthonormal(), tmpCoords);
  mp.mulInside(-1);
  mp.addInside(tmpCoords.mul(2));
  setMidpoint(mp.get());
  for (int i = 0; i < 3; i++) {
   Coords v = eigenvecND[i];
   double a = -2 * v.dotproduct(vn);
   v.addInside(vn.mul(a));
  }
  setMatrixFromEigen();
  setEigenMatrix(getHalfAxis(0), getHalfAxis(1), getHalfAxis(2));
  if (type == GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PLANE) {
   planes[0].mirror(plane);
   if (type != GeoQuadricNDConstants.QUADRIC_PLANE) {
    planes[1].mirror(plane);
   }
  }
  else if (type == GeoQuadricNDConstants.QUADRIC_LINE) {
   line.mirror(plane);
  }
 }
 public void dilate(NumberValue rval, Coords S) {
  double r = rval.getDouble();
  Coords mp = getMidpoint3D();
  mp.mulInside(r);
  mp.addInside(S.mul(1 - r));
  setMidpoint(mp.get());
  if (r < 0) {
   for (int i = 0; i < 3; i++) {
    eigenvecND[i].mulInside(-1);
   }
   r = -r;
  }
  for (int i = 0; i < 3; i++) {
   halfAxes[i] *= r;
   diagonal[i] *= r;
  }
  setMatrixFromEigen();
  setEigenMatrix(getHalfAxis(0), getHalfAxis(1), getHalfAxis(2));
  volume *= r * r * r;
  if (type == GeoQuadricNDConstants.QUADRIC_INTERSECTING_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PARALLEL_PLANES
    || type == GeoQuadricNDConstants.QUADRIC_PLANE) {
   planes[0].dilate(rval, S);
   if (type != GeoQuadricNDConstants.QUADRIC_PLANE) {
    planes[1].dilate(rval, S);
   }
  }
  else if (type == GeoQuadricNDConstants.QUADRIC_LINE) {
   line.dilate(rval, S);
  }
 }
 public double getVolume() {
  switch (getType()) {
   case QUADRIC_SPHERE:
   case QUADRIC_ELLIPSOID:
    return volume;
   case QUADRIC_CONE:
   case QUADRIC_CYLINDER:
   default:
    return Double.NaN;
  }
 }
 public boolean hasFiniteVolume() {
  switch (getType()) {
   case QUADRIC_SPHERE:
   case QUADRIC_ELLIPSOID:
    return isDefined();
   default:
    return false;
  }
 }
 public void setUndefined() {
  super.setUndefined();
  volume = Double.NaN;
 }
 protected final void singlePoint() {
  type = GeoQuadricNDConstants.QUADRIC_SINGLE_POINT;
 }
 public boolean isGeoQuadric() {
  return true;
 }
 protected void getXMLTags(XMLStringBuilder sb) {
  getStyleXML(sb);
  sb.startTag("eigenvectors");
  sb.attr("x0", eigenvecND[0].getX());
  sb.attr("y0", eigenvecND[0].getY());
  sb.attr("z0", eigenvecND[0].getZ());
  sb.attr("x1", eigenvecND[1].getX());
  sb.attr("y1", eigenvecND[1].getY());
  sb.attr("z1", eigenvecND[1].getZ());
  sb.attr("x2", eigenvecND[2].getX());
  sb.attr("y2", eigenvecND[2].getY());
  sb.attr("z2", eigenvecND[2].getZ());
  sb.endTag();
  getMatrixXML(sb);
 }
 public void getStyleXML(XMLStringBuilder sb) {
  super.getStyleXML(sb);
  getLineStyleXML(sb);
  XMLBuilder.appendEquationTypeConic(sb, getEquationForm(), null);
 }
 public final void setEigenvectors(
   double x0,
   double y0,
   double z0,
   double x1,
   double y1,
   double z1,
   double x2,
   double y2,
   double z2) {
  eigenvecND[0].set(x0, y0, z0);
  eigenvecND[1].set(x1, y1, z1);
  eigenvecND[2].set(x2, y2, z2);
 }
 protected void getMatrixXML(XMLStringBuilder sb) {
  sb.startTag("matrix");
  for (int i = 0; i < 10; i++) {
   sb.attr("A" + i, matrix[i]);
  }
  sb.endTag();
 }
 public final HitType getLastHitType() {
  return HitType.ON_FILLING;
 }
 public ValueType getValueType() {
  return ValueType.EQUATION;
 }
 public boolean showLineProperties() {
  return type == GeoQuadricNDConstants.QUADRIC_LINE
    || type == GeoQuadricNDConstants.QUADRIC_SINGLE_POINT;
 }
 protected void getXMLAnimationTags(final XMLStringBuilder sb) {
 }
 public Equation getEquation() {
  return kernel.getAlgebraProcessor().parseEquation(this);
 }
 public void set(Coords origin, Coords direction, Coords eigen, double r, double r2) {
 }
 public void setLimits(double min, double max) {
 }
 public String[] getEquationVariables() {
  ArrayList<String> vars = new ArrayList<>();
  if (!MyDouble.exactEqual(matrix[0], 0)
    || !MyDouble.exactEqual(matrix[4], 0)
    || !MyDouble.exactEqual(matrix[5], 0)
    || !MyDouble.exactEqual(matrix[7], 0)) {
   vars.add("x");
  }
  if (!MyDouble.exactEqual(matrix[1], 0)
    || !MyDouble.exactEqual(matrix[4], 0)
    || !MyDouble.exactEqual(matrix[6], 0)
    || !MyDouble.exactEqual(matrix[8], 0)) {
   vars.add("y");
  }
  if (!MyDouble.exactEqual(matrix[2], 0)
    || !MyDouble.exactEqual(matrix[5], 0)
    || !MyDouble.exactEqual(matrix[6], 0)
    || !MyDouble.exactEqual(matrix[9], 0)) {
   vars.add("z");
  }
  return vars.toArray(new String[0]);
 }
 public boolean setEquationFormFromXML(String style, String parameter) {
  if ("implicit".equals(style)) {
   setToImplicitForm();
  } else if ("specific".equals(style)) {
   setToSpecificForm();
  } else if ("user".equals(style)) {
   setToUserForm();
  } else {
   return false;
  }
  return true;
 }
 public boolean isSpecificFormPossible() {
  return type == QUADRIC_SPHERE;
 }
 public String getSpecificEquationLabel() {
  if (type == QUADRIC_SPHERE) {
   return getLoc().getMenu("SphereEquation");
  }
  return null;
 }
 public String getSpecificEquationLabelKey() {
  if (type == QUADRIC_SPHERE) {
   return "SphereEquation";
  }
  return null;
 }
 public String getImplicitEquationLabelKey() {
  return "ExpandedForm";
 }
 protected final void setMatrixFromEigen() {
  setMatrixFromEigen(0);
 }
 protected final void setMatrixFromEigen(double m21) {
  if (tmpEigenMatrix == null) {
   tmpEigenMatrix = new CoordMatrix(4, 4);
  }
  tmpEigenMatrix.set(eigenvecND);
  tmpEigenMatrix.set(getMidpoint(), 4);
  CoordMatrix diagonalizedMatrix = CoordMatrix.diagonalMatrix(diagonal);
  CoordMatrix eigenMatrixInv = tmpEigenMatrix.inverse();
  diagonalizedMatrix.set(1, 4, m21);
  diagonalizedMatrix.set(4, 1, m21);
  CoordMatrix finalMatrix =
    eigenMatrixInv.transposeCopy().mul(diagonalizedMatrix).mul(eigenMatrixInv);
  setMatrix(finalMatrix);
 }
 public void matrixTransform(double a00, double a01, double a10, double a11) {
  matrixTransform(a00, a01, 0, a10, a11, 0, 0, 0, 1);
 }
 public void matrixTransform(
   double a00,
   double a01,
   double a02,
   double a10,
   double a11,
   double a12,
   double a20,
   double a21,
   double a22) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = CoordMatrix4x4.identity();
  } else {
   tmpMatrix4x4.resetLastRowAndColumn();
  }
  tmpMatrix4x4.set(1, 1, a00);
  tmpMatrix4x4.set(1, 2, a01);
  tmpMatrix4x4.set(1, 3, a02);
  tmpMatrix4x4.set(2, 1, a10);
  tmpMatrix4x4.set(2, 2, a11);
  tmpMatrix4x4.set(2, 3, a12);
  tmpMatrix4x4.set(3, 1, a20);
  tmpMatrix4x4.set(3, 2, a21);
  tmpMatrix4x4.set(3, 3, a22);
  showUndefinedInAlgebraView = true;
  matrixTransform(tmpMatrix4x4);
  volume = volume * Math.abs(tmpMatrix4x4.det());
  transformDegenerate(el -> el.matrixTransform(a00, a01, a02, a10, a11, a12, a20, a21, a22));
  classifyQuadric();
 }
 public boolean isMatrixTransformable() {
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoQuadric3DLimited.java
```java
public class GeoQuadric3DLimited extends GeoQuadricND
  implements GeoNumberValue,
    HasVolume,
    HasHeight,
    RotatableND,
    Translateable,
    MirrorableAtPlane,
    Transformable,
    Dilateable,
    GeoQuadric3DLimitedInterface,
    GeoQuadric3DLimitedOrPart {
 private GeoQuadric3DPart side;
 private GeoConicND bottom;
 private GeoConic3D top;
 private double bottomParameter;
 private double topParameter;
 private Coords direction;
 private Coords origin;
 private double radius;
 private boolean silentTop = false;
 private double volume;
 public GeoQuadric3DLimited(Construction c, int type) {
  super(c);
  setType(type);
  setConstructionDefaults();
 }
 public void setBottomTop(GeoConicND bottom2, GeoConic3D top) {
  this.bottom = bottom2;
  this.top = top;
  bottom.addMeta(this);
  top.addMeta(this);
 }
 public void setSide(GeoQuadric3DPart side) {
  this.side = side;
  side.setFromMeta(this);
 }
 public void remove() {
  bottom.removeMeta(this);
  super.remove();
 }
 public GeoQuadric3DLimited(GeoQuadric3DLimited quadric) {
  this(quadric.getConstruction(), quadric.getType());
  this.bottom = new GeoConic3D(quadric.getConstruction());
  this.top = new GeoConic3D(quadric.getConstruction());
  this.side = new GeoQuadric3DPart(quadric.getConstruction());
  set(quadric);
 }
 public GeoConicND getBottom() {
  return bottom;
 }
 public GeoConic3D getTop() {
  return top;
 }
 public GeoQuadric3DPart getSide() {
  return side;
 }
 public void updatePartsVisualStyle() {
  setObjColor(getObjectColor());
  setLineThickness(getLineThickness());
  setAlphaValue(getAlphaValue());
  setEuclidianVisible(isEuclidianVisible());
 }
 public void initLabelsIncludingBottom(String[] labels) {
  if (cons.isSuppressLabelsActive()) { 
   return;
  }
  kernel.batchAddStarted();
  if (labels == null || labels.length == 0) {
   setLabel(null);
   initSideLabels(null);
  } else {
   setLabel(labels[0]);
   initSideLabels(labels);
  }
  kernel.batchAddComplete();
 }
 private void initSideLabels(String[] labels) {
  if (labels == null || labels.length < 3) {
   bottom.setLabel(null);
   if (!silentTop) {
    top.setLabel(null);
   }
   side.setLabel(null);
  } else if (labels.length == 3) {
   bottom.setLabel(labels[1]);
   side.setLabel(labels[2]);
  } else {
   bottom.setLabel(labels[1]);
   top.setLabel(labels[2]);
   side.setLabel(labels[3]);
  }
 }
 public void initLabelsNoBottom(String[] labels) {
  if (cons.isSuppressLabelsActive()) { 
   return;
  }
  if (labels == null || labels.length == 0) {
   initLabelsNoBottom(new String[1]);
   return;
  }
  setLabel(labels[0]);
  if (labels.length < 3) {
   if (!silentTop) {
    top.setLabel(null);
   }
   side.setLabel(null);
   return;
  }
  top.setLabel(labels[1]);
  side.setLabel(labels[2]);
 }
 public double getBottomParameter() {
  return bottomParameter;
 }
 public double getTopParameter() {
  return topParameter;
 }
 public Coords getDirection() {
  return direction;
 }
 public Coords getOrigin() {
  return origin;
 }
 public void setCylinder(
   Coords origin, Coords direction, double r, double bottomParameter, double topParameter) {
  setLimits(bottomParameter, topParameter);
  this.origin = origin;
  this.direction = direction;
  this.radius = r;
  setType(QUADRIC_CYLINDER);
 }
 public void setHyperbolicCylinder(
   Coords origin, Coords direction, double r, double bottomParameter, double topParameter) {
  setLimits(bottomParameter, topParameter);
  this.origin = origin;
  this.direction = direction;
  this.radius = r;
  setType(QUADRIC_HYPERBOLIC_CYLINDER);
 }
 public void setParabolicCylinder(
   Coords origin, Coords direction, double r, double bottomParameter, double topParameter) {
  setLimits(bottomParameter, topParameter);
  this.origin = origin;
  this.direction = direction;
  this.radius = r;
  setType(QUADRIC_PARABOLIC_CYLINDER);
 }
 public void setLimits(double bottomParameter, double topParameter) {
  this.bottomParameter = bottomParameter;
  this.topParameter = topParameter;
 }
 public double getRadius() {
  return radius;
 }
 public void setCone(
   Coords origin, Coords direction, double r, double bottomParameter, double topParameter) {
  setLimits(bottomParameter, topParameter);
  this.origin = origin;
  this.direction = direction;
  this.radius = r;
  type = QUADRIC_CONE;
 }
 public void setObjColor(GColor color) {
  super.setObjColor(color);
  if (bottom == null) {
   return;
  }
  bottom.setObjColor(color);
  if (!silentTop) {
   top.setObjColor(color);
  }
  side.setObjColor(color);
 }
 public void setTrace(boolean trace) {
  super.setTrace(trace);
  if (bottom == null) {
   return;
  }
  bottom.setTrace(trace);
  if (!silentTop) {
   top.setTrace(trace);
  }
  side.setTrace(trace);
 }
 public boolean isFillable() {
  return true;
 }
 public void setEuclidianVisible(boolean visible) {
  super.setEuclidianVisible(visible);
  bottom.setEuclidianVisible(visible);
  if (!silentTop) {
   top.setEuclidianVisible(visible);
  }
  side.setEuclidianVisible(visible);
 }
 public void setShowObjectCondition(final GeoBoolean cond) throws CircularDefinitionException {
  super.setShowObjectCondition(cond);
  if (bottom == null) {
   return;
  }
  bottom.setShowObjectCondition(cond);
  if (!silentTop) {
   top.setShowObjectCondition(cond);
  }
  side.setShowObjectCondition(cond);
 }
 public void updateVisualStyle(GProperty prop) {
  super.updateVisualStyle(prop);
  if (bottom == null) {
   return;
  }
  bottom.updateVisualStyle(prop);
  if (!silentTop) {
   top.updateVisualStyle(prop);
  }
  side.updateVisualStyle(prop);
 }
 public void setLineType(int type) {
  super.setLineType(type);
  if (bottom == null) {
   return;
  }
  bottom.setLineType(type);
  bottom.update();
  if (!silentTop) {
   top.setLineType(type);
   top.update();
  }
 }
 public void setLineTypeHidden(int type) {
  super.setLineTypeHidden(type);
  if (bottom == null) {
   return;
  }
  bottom.setLineTypeHidden(type);
  bottom.update();
  if (!silentTop) {
   top.setLineTypeHidden(type);
   top.update();
  }
 }
 public void setLineThickness(int th) {
  super.setLineThickness(th);
  if (bottom == null) {
   return;
  }
  bottom.setLineThickness(th);
  bottom.update();
  if (!silentTop) {
   top.setLineThickness(th);
   top.update();
  }
 }
 public void setAlphaValue(double alpha) {
  super.setAlphaValue(alpha);
  if (bottom == null) {
   return;
  }
  bottom.setAlphaValue(alpha);
  bottom.updateVisualStyle(GProperty.COLOR);
  if (!silentTop) {
   top.setAlphaValue(alpha);
   top.updateVisualStyle(GProperty.COLOR);
  }
  side.setAlphaValue(alpha);
  side.updateVisualStyle(GProperty.COLOR);
  getKernel().notifyRepaint();
 }
 public GeoElement copy() {
  return new GeoQuadric3DLimited(this);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.QUADRIC_LIMITED;
 }
 public String getTypeString() {
  return side.getQuadricTypeString();
 }
 public ExtendedBoolean isEqualExtended(GeoElementND geo) {
  return ExtendedBoolean.newExtendedBoolean(this == geo); 
 }
 public void set(GeoElementND geo) {
  if (geo instanceof GeoQuadric3DLimited) {
   GeoQuadric3DLimited quadric = (GeoQuadric3DLimited) geo;
   bottomParameter = quadric.bottomParameter;
   topParameter = quadric.topParameter;
   quadric.calcVolume();
   volume = quadric.volume;
   bottom.set(quadric.bottom);
   top.set(quadric.top);
   silentTop = quadric.silentTop;
   side.set(quadric.side);
   equationForm = quadric.equationForm;
   type = quadric.type;
   radius = quadric.getRadius();
   origin = side.getMidpoint3D();
   direction = side.getEigenvec3D(2);
   defined = quadric.defined;
   super.set(geo);
  }
 }
 protected boolean showInEuclidianView() {
  return true;
 }
 public void calcVolume() {
  if (bottom == null) {
   volume = Double.NaN;
   return;
  }
  double pih = Math.PI * Math.abs(topParameter - bottomParameter);
  switch (type) {
   default:
   case QUADRIC_CYLINDER:
    if (bottom.halfAxes == null) {
     volume = radius * radius * pih;
    } else {
     volume = bottom.getHalfAxis(0) * bottom.getHalfAxis(1) * pih;
    }
    break;
   case QUADRIC_CONE:
    double h = Math.abs(topParameter - bottomParameter);
    if (bottom.halfAxes == null) {
     double r = radius * h; 
     volume = r * r * pih / 3;
    } else {
     volume = bottom.getHalfAxis(0) * bottom.getHalfAxis(1) * pih / 3;
    }
    break;
  }
 }
 public double getVolume() {
  if (defined) {
   return volume;
  }
  return Double.NaN;
 }
 public boolean hasFiniteVolume() {
  return true;
 }
 public String toValueString(StringTemplate tpl) {
  switch (type) {
   case QUADRIC_CYLINDER:
   case QUADRIC_CONE:
    return kernel.format(volume, tpl);
   case QUADRIC_EMPTY:
    return kernel.format(0, tpl);
   default:
    Log.debug("todo-GeoQuadric3DLimited");
    return "?";
  }
 }
 protected StringBuilder buildValueString(StringTemplate tpl) {
  return new StringBuilder(toValueString(tpl));
 }
 public void setSphereND(GeoPointND M, GeoSegmentND segment) {
 }
 public void setSphereND(GeoPointND M, GeoPointND P) {
 }
 public MyDouble getNumber() {
  return new MyDouble(kernel, getDouble());
 }
 public double getDouble() {
  return getVolume();
 }
 public boolean isNumberValue() {
  return true;
 }
 public void setSilentTop() {
  silentTop = true;
 }
 public double getOrientedHeight() {
  return topParameter - bottomParameter;
 }
 public boolean isGeoElement3D() {
  return true;
 }
 public boolean hasFillType() {
  return false;
 }
 protected void setColorVisualStyle(final GeoElement geo) {
  setObjColor(geo.getObjectColor());
  setAlphaValue(geo.getAlphaValue());
 }
 public void rotate(NumberValue r, GeoPointND S) {
  bottom.rotate(r, S);
  top.rotate(r, S);
  side.rotate(r, S);
  origin = side.getMidpoint3D();
  direction = side.getEigenvec3D(2);
 }
 public void rotate(NumberValue r) {
  bottom.rotate(r);
  top.rotate(r);
  side.rotate(r);
  origin = side.getMidpoint3D();
  direction = side.getEigenvec3D(2);
 }
 public void rotate(NumberValue r, Coords S, GeoDirectionND orientation) {
  ((GeoConic3D) bottom).rotate(r, S, orientation);
  top.rotate(r, S, orientation);
  side.rotate(r, S, orientation);
  origin = side.getMidpoint3D();
  direction = side.getEigenvec3D(2);
 }
 public final boolean isTranslateable() {
  return true;
 }
 public void translate(Coords v) {
  bottom.translate(v);
  top.translate(v);
  side.translate(v);
  origin = side.getMidpoint3D();
 }
 public void mirror(Coords Q) {
  bottom.mirror(Q);
  top.mirror(Q);
  side.mirror(Q);
  origin = side.getMidpoint3D();
  direction = side.getEigenvec3D(2);
 }
 public void mirror(GeoLineND g) {
  bottom.mirror(g);
  top.mirror(g);
  side.mirror(g);
  origin = side.getMidpoint3D();
  direction = side.getEigenvec3D(2);
 }
 public void mirror(GeoCoordSys2D plane) {
  ((MirrorableAtPlane) bottom).mirror(plane);
  top.mirror(plane);
  side.mirror(plane);
  origin = side.getMidpoint3D();
  direction = side.getEigenvec3D(2);
 }
 public void dilate(NumberValue rval, Coords S) {
  bottom.dilate(rval, S);
  top.dilate(rval, S);
  side.dilate(rval, S);
  double r = Math.abs(rval.getDouble());
  volume *= r * r * r;
  bottomParameter *= r;
  topParameter *= r;
  origin = side.getMidpoint3D();
  direction = side.getEigenvec3D(2);
 }
 protected final void singlePoint() {
  type = GeoQuadricNDConstants.QUADRIC_SINGLE_POINT;
 }
 public Coords getMidpoint2D() {
  return side.getMidpoint2D();
 }
 public Coords getMidpoint() {
  return side.getMidpoint();
 }
 public Coords getMidpoint3D() {
  return side.getMidpoint3D();
 }
 public CoordMatrix getSymmetricMatrix() {
  return side.getSymmetricMatrix();
 }
 public double getHalfAxis(int i) {
  return side.getHalfAxis(i);
 }
 public int getDimension() {
  return side.getDimension();
 }
 public Coords getEigenvec3D(int i) {
  return side.getEigenvec3D(i);
 }
 public double[] getFlatMatrix() {
  return side.getFlatMatrix();
 }
 public final HitType getLastHitType() {
  return HitType.ON_FILLING;
 }
 public ValueType getValueType() {
  return ValueType.NUMBER;
 }
 public boolean setHighlighted(final boolean flag) {
  boolean ret = super.setHighlighted(flag);
  if (ret && bottom != null) {
   kernel.notifyUpdateHighlight(side);
   kernel.notifyUpdateHighlight(bottom);
   kernel.notifyUpdateHighlight(top);
  }
  return ret;
 }
 public boolean setSelected(final boolean flag) {
  boolean ret = super.setSelected(flag);
  if (ret && bottom != null) {
   kernel.notifyUpdateHighlight(side);
   kernel.notifyUpdateHighlight(bottom);
   kernel.notifyUpdateHighlight(top);
  }
  return ret;
 }
 public boolean showLineProperties() {
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoQuadric3DLimitedOrPart.java
```java
public interface GeoQuadric3DLimitedOrPart {
 double getBottomParameter();
 double getTopParameter();
}
```

### FILE: geogebra3D/kernel3D/geos/GeoQuadric3DPart.java
```java
public class GeoQuadric3DPart extends GeoQuadric3D
  implements GeoNumberValue, FromMeta, GeoQuadric3DPartInterface, GeoQuadric3DLimitedOrPart {
 private double bottom;
 private double top;
 private double min;
 private double max;
 private double[] tmpDouble2bis = new double[2];
 private double area;
 private GeoElement meta = null;
 public GeoQuadric3DPart(Construction c) {
  super(c);
 }
 public GeoQuadric3DPart(GeoQuadric3DPart quadric) {
  super(quadric);
 }
 public void set(GeoElementND geo) {
  super.set(geo);
  GeoQuadric3DPart quadric = (GeoQuadric3DPart) geo;
  setLimits(quadric.bottom, quadric.top);
  area = quadric.getArea();
 }
 public void setLimits(double min, double max) {
  bottom = min;
  top = max;
  if (min < max) {
   this.min = min;
   this.max = max;
  } else {
   this.min = max;
   this.max = min;
  }
 }
 public double getBottomParameter() {
  return bottom;
 }
 public double getTopParameter() {
  return top;
 }
 public double getMinParameter(int index) {
  if (index == 1) {
   return min;
  }
  return super.getMinParameter(index);
 }
 public double getMaxParameter(int index) {
  if (index == 1) {
   return max;
  }
  return super.getMaxParameter(index);
 }
 public void set(Coords origin, Coords direction, Coords eigen, double r, double r2) {
  switch (type) {
   default:
   case QUADRIC_CYLINDER:
    setCylinder(origin, direction, eigen, r, r2);
    break;
   case QUADRIC_HYPERBOLIC_CYLINDER:
    setHyperbolicCylinder(origin, direction, eigen, r, r2);
    break;
   case QUADRIC_PARABOLIC_CYLINDER:
    setParabolicCylinder(origin, direction, eigen, r2);
    break;
   case QUADRIC_CONE:
    setCone(origin, direction, eigen, r, r2);
    break;
  }
 }
 public GeoClass getGeoClassType() {
  return GeoClass.QUADRIC_PART;
 }
 public String toValueString(StringTemplate tpl) {
  switch (type) {
   case QUADRIC_CYLINDER:
   case QUADRIC_CONE:
    return kernel.format(area, tpl);
   default:
    Log.debug("todo-GeoQuadric3DPart");
    return "?";
  }
 }
 protected StringBuilder buildValueString(StringTemplate tpl) {
  return new StringBuilder(toValueString(tpl));
 }
 public GeoElement copy() {
  return new GeoQuadric3DPart(this);
 }
 protected void getNormalProjectionParameters(Coords coords, double[] parameters) {
  super.getNormalProjectionParameters(coords, parameters);
  if (parameters[1] < getMinParameter(1)) {
   parameters[1] = getMinParameter(1);
  } else if (parameters[1] > getMaxParameter(1)) {
   parameters[1] = getMaxParameter(1);
  }
 }
 protected Coords[] getProjection(
   Coords willingCoords, Coords willingDirection, double t1, double t2) {
  if (DoubleUtil.isGreater(t2, t1)) {
   return getProjectionSorted(willingCoords, willingDirection, t1, t2);
  }
  if (DoubleUtil.isGreater(t1, t2)) {
   return getProjectionSorted(willingCoords, willingDirection, t2, t1);
  }
  return super.getProjection(willingCoords, willingDirection, t1, t2);
 }
 protected boolean checkParameters(double[] parameters) {
  if (DoubleUtil.isGreater(getMinParameter(1), parameters[1])) {
   parameters[1] = getMinParameter(1);
   return false;
  }
  if (DoubleUtil.isGreater(parameters[1], getMaxParameter(1))) {
   parameters[1] = getMaxParameter(1);
   return false;
  }
  return super.checkParameters(parameters);
 }
 private Coords[] getProjectionSorted(
   Coords willingCoords, Coords willingDirection, double t1, double t2) {
  super.getNormalProjectionParameters(willingCoords.add(willingDirection.mul(t1)), tmpDouble2);
  if (DoubleUtil.isGreater(getMinParameter(1), tmpDouble2[1])) {
   tmpDouble2[1] = getMinParameter(1);
  } else if (DoubleUtil.isGreater(tmpDouble2[1], getMaxParameter(1))) {
   tmpDouble2[1] = getMaxParameter(1);
  } else {
   return new Coords[] {getPoint(tmpDouble2[0], tmpDouble2[1]), new Coords(tmpDouble2)}; 
  }
  super.getNormalProjectionParameters(willingCoords.add(willingDirection.mul(t2)), tmpDouble2bis);
  if (DoubleUtil.isGreater(getMinParameter(1), tmpDouble2bis[1])) {
   tmpDouble2bis[1] = getMinParameter(1);
  } else if (DoubleUtil.isGreater(tmpDouble2bis[1], getMaxParameter(1))) {
   tmpDouble2bis[1] = getMaxParameter(1);
  } else {
   return new Coords[] {getPoint(tmpDouble2bis[0], tmpDouble2bis[1]), new Coords(tmpDouble2bis)
   }; 
  }
  Coords l1 = getPoint(tmpDouble2[0], tmpDouble2[1]);
  Coords l2 = getPoint(tmpDouble2bis[0], tmpDouble2bis[1]);
  double d1 = l1.distLine(willingCoords, willingDirection);
  double d2 = l2.distLine(willingCoords, willingDirection);
  if (DoubleUtil.isGreater(d1, d2)) {
   return new Coords[] {getPoint(tmpDouble2bis[0], tmpDouble2bis[1]), new Coords(tmpDouble2bis)};
  }
  return new Coords[] {getPoint(tmpDouble2[0], tmpDouble2[1]), new Coords(tmpDouble2)};
 }
 public boolean isInRegion(Coords coords) {
  if (!super.isInRegion(coords)) {
   return false;
  }
  super.getNormalProjectionParameters(coords, tmpDouble2);
  return tmpDouble2[1] >= getMinParameter(1) && tmpDouble2[1] <= getMaxParameter(1);
 }
 protected Coords getPointInRegion(double u, double v) {
  double v0;
  if (v < getMinParameter(1)) {
   v0 = getMinParameter(1);
  } else if (v > getMaxParameter(1)) {
   v0 = getMaxParameter(1);
  } else {
   v0 = v;
  }
  return super.getPointInRegion(u, v0);
 }
 public void calcArea() {
  switch (type) {
   case QUADRIC_CYLINDER:
    if (!DoubleUtil.isEqual(getHalfAxis(0), getHalfAxis(1))) {
     area = EllipticArcLength.getEllipseCircumference(getHalfAxis(0), getHalfAxis(1))
       * (max - min);
    } else {
     area = 2 * getHalfAxis(0) * Math.PI * (max - min);
    }
    break;
   case QUADRIC_CONE:
    if (!DoubleUtil.isEqual(getHalfAxis(0), getHalfAxis(1))) {
     double h = max - min;
     double a = getHalfAxis(0) * h;
     double b = getHalfAxis(1) * h;
     area = 0.5
       * a
       * Math.sqrt(b * b + h * h)
       * EllipticArcLength.getEllipseCircumference(
         1, Math.sqrt(1 - (1 - b / a * b / a) / (1 + b / h * b / h)));
     return;
    }
    double r2 = getHalfAxis(0);
    r2 *= r2;
    double h2;
    if (min * max < 0) { 
     h2 = min * min + max * max;
    } else { 
     h2 = Math.abs(max * max - min * min);
    }
    area = Math.PI * h2 * r2 * Math.sqrt(1 + 1 / r2);
    break;
   default:
    Log.debug("todo-area");
    area = Double.NaN;
  }
 }
 public double getArea() {
  if (defined) {
   return area;
  }
  return Double.NaN;
 }
 public MyDouble getNumber() {
  return new MyDouble(kernel, getDouble());
 }
 public double getDouble() {
  return getArea();
 }
 public boolean isNumberValue() {
  return true;
 }
 public int getMetasLength() {
  if (meta == null) {
   return 0;
  }
  return 1;
 }
 public GeoElement[] getMetas() {
  return new GeoElement[] {meta};
 }
 public void setFromMeta(GeoElement quadric) {
  meta = quadric;
 }
 public void dilate(NumberValue rval, Coords S) {
  super.dilate(rval, S);
  double r = rval.getDouble();
  area *= r * r;
  double rAbs = Math.abs(r);
  bottom *= rAbs;
  top *= rAbs;
  min *= rAbs;
  max *= rAbs;
 }
 protected void getMatrixXML(XMLStringBuilder sb) {
 }
 protected void classifyQuadric() {
  Log.warn("GeoQuadric3DPart should not need classification");
 }
 public String getTypeString() {
  return "Surface";
 }
 public String getQuadricTypeString() {
  return super.getTypeString();
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoRay3D.java
```java
public class GeoRay3D extends GeoLine3D implements GeoRayND, LimitedPath {
 private boolean allowOutlyingIntersections = false;
 private boolean keepTypeOnGeometricTransform = true; 
 public GeoRay3D(Construction c, GeoPointND O, GeoPointND Q) {
  super(c, O, Q);
  setStartPoint(O);
 }
 public GeoRay3D(Construction c, GeoPointND O) {
  super(c);
  setStartPoint(O);
 }
 public GeoRay3D(Construction construction) {
  super(construction);
 }
 public GeoClass getGeoClassType() {
  return GeoClass.RAY3D;
 }
 protected GeoCoordSys1D create(Construction cons1) {
  return new GeoRay3D(cons1);
 }
 public double getMinParameter() {
  return 0;
 }
 public boolean isValidCoord(double x) {
  return x >= 0;
 }
 public boolean isOnPath(Coords p, double eps) {
  if (!super.isOnPath(p, eps)) {
   return false;
  }
  return respectLimitedPath(p, eps);
 }
 public boolean respectLimitedPath(Coords p, double eps) {
  if (DoubleUtil.isEqual(p.getW(), 0, eps)) {
   return false;
  }
  double d = p.sub(getStartInhomCoords()).dotproduct(getDirectionInD3());
  return d >= -eps;
 }
 public final boolean isLimitedPath() {
  return true;
 }
 public boolean allowOutlyingIntersections() {
  return allowOutlyingIntersections;
 }
 public void setAllowOutlyingIntersections(boolean flag) {
  allowOutlyingIntersections = flag;
 }
 public boolean keepsTypeOnGeometricTransform() {
  return keepTypeOnGeometricTransform;
 }
 public void setKeepTypeOnGeometricTransform(boolean flag) {
  keepTypeOnGeometricTransform = flag;
 }
 public GeoElement[] createTransformedObject(Transform t, String label1) {
  AlgoElement algoParent1 = keepTypeOnGeometricTransform ? getParentAlgorithm() : null;
  if (algoParent1 instanceof AlgoJoinPoints3D && t.isAffine()) {
   AlgoJoinPoints3D algo = (AlgoJoinPoints3D) algoParent1;
   GeoPointND[] points = {algo.getP(), algo.getQ()};
   points = t.transformPoints(points);
   GeoElement ray = (GeoElement) kernel.getManager3D().ray3D(label1, points[0], points[1]);
   ray.setVisualStyleForTransformations(this);
   GeoElement[] geos = {ray, (GeoElement) points[0], (GeoElement) points[1]};
   return geos;
  }
  GeoElement transformedLine = t.getTransformedLine(this);
  transformedLine.setLabel(label1);
  GeoElement[] ret = {transformedLine};
  return ret;
 }
 public boolean isAllEndpointsLabelsSet() {
  return startPoint.isLabelSet();
 }
 public boolean isIntersectionPointIncident(GeoPoint p, double eps) {
  if (allowOutlyingIntersections) {
   return isOnFullLine(p.getCoordsInD3(), eps);
  }
  return isOnPath(p, eps);
 }
 public GeoElement copyInternal(Construction cons1) {
  GeoRay3D ray = new GeoRay3D(cons1, (GeoPointND) startPoint.copyInternal(cons1));
  ray.set(this);
  return ray;
 }
 public void set(GeoElementND geo) {
  super.set(geo);
  if (!geo.isGeoRay()) {
   return;
  }
  if (!geo.isDefined()) {
   setUndefined();
  }
  GeoRayND ray = (GeoRayND) geo;
  setKeepTypeOnGeometricTransform(ray.keepsTypeOnGeometricTransform());
  startPoint = GeoLine.updatePoint(cons, startPoint, ray.getStartPoint());
 }
 protected void getStyleXML(XMLStringBuilder sb) {
  super.getStyleXML(sb);
  sb.startTag("outlyingIntersections").attr("val", allowOutlyingIntersections).endTag();
  sb.startTag("keepTypeOnTransform").attr("val", keepTypeOnGeometricTransform).endTag();
 }
 public boolean isGeoRay() {
  return true;
 }
 public boolean respectLimitedPath(double parameter) {
  return DoubleUtil.isGreaterEqual(parameter, 0);
 }
 protected final void getCoordsXML(XMLStringBuilder sb) {
 }
 public GeoElement copyFreeRay() {
  GeoPointND startPoint1 = (GeoPointND) getStartPoint().copyInternal(cons);
  Coords direction = getDirectionInD3();
  GeoVector3D directionVec = new GeoVector3D(cons);
  directionVec.setCoords(direction);
  AlgoRayPointVector3D algo = new AlgoRayPointVector3D(cons, startPoint1, directionVec);
  return algo.getOutput(0);
 }
 public boolean isWhollyIn2DView(EuclidianView ev) {
  if (!DoubleUtil.isZero(getStartPoint().getInhomCoords().getZ())) {
   return false;
  }
  Coords equation = getCartesianEquationVector(ev.getMatrix());
  return equation != null;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoSegment3D.java
```java
public class GeoSegment3D extends GeoCoordSys1D implements GeoSegmentND {
 private boolean allowOutlyingIntersections = false;
 private boolean keepTypeOnGeometricTransform = true; 
 private ChangeableParent changeableParent = null;
 private boolean forceSimpleTransform;
 private GeoElement meta = null;
 public GeoSegment3D(Construction c) {
  super(c);
 }
 public GeoSegment3D(Construction c, GeoPointND p1, GeoPointND p2) {
  this(c, p1, p2, false);
 }
 public GeoSegment3D(Construction c, GeoPointND p1, GeoPointND p2, boolean isIntersection) {
  super(c, p1, p2, isIntersection);
 }
 public double getLength() {
  if (isDefined()) {
   return getUnit();
  }
  return Double.NaN;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.SEGMENT3D;
 }
 protected GeoCoordSys1D create(Construction cons2) {
  return new GeoSegment3D(cons2);
 }
 public ExtendedBoolean isEqualExtended(GeoElementND geo) {
  if (!geo.isGeoSegment()) {
   return ExtendedBoolean.FALSE;
  }
  GeoSegmentND s = (GeoSegmentND) geo;
  boolean ret = (getStartInhomCoords().equalsForKernel(s.getStartInhomCoords())
      && getEndInhomCoords().equalsForKernel(s.getEndInhomCoords()))
    || (getStartInhomCoords().equalsForKernel(s.getEndInhomCoords())
      && getEndInhomCoords().equalsForKernel(s.getStartInhomCoords()));
  return ExtendedBoolean.newExtendedBoolean(ret);
 }
 protected boolean showInEuclidianView() {
  return isDefined();
 }
 public String toValueString(StringTemplate tpl) {
  return kernel.format(getLength(), tpl);
 }
 public final String toString(StringTemplate tpl) {
  StringBuilder sbToString = getSbToString();
  sbToString.setLength(0);
  sbToString.append(label);
  sbToString.append(" = "); 
  sbToString.append(kernel.format(getLength(), tpl));
  return sbToString.toString();
 }
 public boolean isGeoSegment() {
  return true;
 }
 public void setTwoPointsInhomCoords(Coords start, Coords end) {
  this.setCoord(start, end.sub(start));
 }
 public boolean isOnPath(Coords p, double eps) {
  if (!super.isOnPath(p, eps)) {
   return false;
  }
  return respectLimitedPath(p, eps);
 }
 public boolean respectLimitedPath(Coords p, double eps) {
  if (DoubleUtil.isEqual(p.getW(), 0, eps)) {
   return false;
  }
  double d = p.sub(getStartInhomCoords()).dotproduct(getDirectionInD3());
  if (d < -eps) {
   return false;
  }
  double l = getLength();
  return d <= l * l + eps;
 }
 public PathMover createPathMover() {
  return new PathMoverGeneric(this);
 }
 public double getMaxParameter() {
  return 1;
 }
 public double getMinParameter() {
  return 0;
 }
 public boolean isClosedPath() {
  return false;
 }
 public double getPointX(double parameter) {
  return 0;
 }
 public double getPointY(double parameter) {
  return 0;
 }
 public void getPointCoords(double parameter, Coords point) {
  point.setSub3(endPoint.getInhomCoordsInD3(), startPoint.getInhomCoordsInD3());
  point.mulInside3(parameter);
  point.setAdd3(startPoint.getInhomCoordsInD3(), point);
  point.setW(1);
 }
 public GeoElement getStartPointAsGeoElement() {
  return (GeoElement) startPoint;
 }
 public GeoElement getEndPointAsGeoElement() {
  return (GeoElement) endPoint;
 }
 public boolean isValidCoord(double x) {
  return (x >= 0) && (x <= 1);
 }
 public final boolean isGeoLine() {
  return true;
 }
 public final boolean isLimitedPath() {
  return true;
 }
 public boolean allowOutlyingIntersections() {
  return allowOutlyingIntersections;
 }
 public void setAllowOutlyingIntersections(boolean flag) {
  allowOutlyingIntersections = flag;
 }
 public boolean keepsTypeOnGeometricTransform() {
  return keepTypeOnGeometricTransform;
 }
 public void setKeepTypeOnGeometricTransform(boolean flag) {
  keepTypeOnGeometricTransform = flag;
 }
 public GeoElement[] createTransformedObject(Transform t, String labelTrans) {
  if (keepTypeOnGeometricTransform && t.isAffine()) {
   GeoPointND[] points = {getStartPoint(), getEndPoint()};
   points = t.transformPoints(points);
   GeoElement segment =
     (GeoElement) kernel.getManager3D().segment3D(labelTrans, points[0], points[1]);
   segment.setVisualStyleForTransformations(this);
   GeoElement[] geos = {segment, (GeoElement) points[0], (GeoElement) points[1]};
   return geos;
  } else if (!t.isAffine()) {
   this.forceSimpleTransform = true;
   GeoElement[] geos = {t.transform(this, labelTrans)[0]};
   return geos;
  } else {
   GeoElement transformedLine = t.getTransformedLine(this);
   transformedLine.setLabel(labelTrans);
   transformedLine.setVisualStyleForTransformations(this);
   GeoElement[] geos = {transformedLine};
   return geos;
  }
 }
 public boolean isAllEndpointsLabelsSet() {
  return !forceSimpleTransform && startPoint.isLabelSet() && endPoint.isLabelSet();
 }
 public boolean isIntersectionPointIncident(GeoPoint p, double eps) {
  if (allowOutlyingIntersections) {
   return isOnFullLine(p.getCoordsInD3(), eps);
  }
  return isOnPath(p, eps);
 }
 public GeoElement copyInternal(Construction cons2) {
  GeoSegment3D seg =
    new GeoSegment3D(cons2, (GeoPointND) startPoint.copyInternal(cons2), (GeoPointND)
      endPoint.copyInternal(cons2));
  seg.set(this);
  return seg;
 }
 public void set(GeoElementND geo) {
  super.set(geo);
  if (!geo.isGeoSegment()) {
   return;
  }
  GeoSegmentND seg = (GeoSegmentND) geo;
  setSegment(seg);
 }
 public void setSegment(GeoSegmentND seg) {
  if (!seg.isDefined()) {
   setUndefined();
  }
  setKeepTypeOnGeometricTransform(seg.keepsTypeOnGeometricTransform());
  setCoord(seg.getStartInhomCoords(), seg.getDirectionInD3());
 }
 protected void getStyleXML(XMLStringBuilder sb) {
  super.getStyleXML(sb);
  sb.startTag("outlyingIntersections").attr("val", allowOutlyingIntersections).endTag();
  sb.startTag("keepTypeOnTransform").attr("val", keepTypeOnGeometricTransform).endTag();
 }
 public final MyDouble getNumber() {
  return new MyDouble(kernel, getLength());
 }
 public final double getDouble() {
  return getLength();
 }
 public final boolean isNumberValue() {
  return true;
 }
 public int getMetasLength() {
  if (meta == null) {
   return 0;
  }
  return 1;
 }
 public GeoElement[] getMetas() {
  return new GeoElement[] {meta};
 }
 public void setFromMeta(GeoElement poly) {
  meta = poly;
 }
 public void modifyInputPoints(GeoPointND P, GeoPointND Q) {
  AlgoJoinPoints3D algo = (AlgoJoinPoints3D) getParentAlgorithm();
  algo.modifyInputPoints(P, Q);
 }
 public void modifyInputPolyAndPoints(GeoElement poly, GeoPointND P, GeoPointND Q) {
  AlgoJoinPoints3D algo = (AlgoJoinPoints3D) getParentAlgorithm();
  algo.modifyInputPolyAndPoints(poly, P, Q);
 }
 public final void removePointOnLine(GeoPointND p) {
 }
 public boolean respectLimitedPath(double parameter) {
  return DoubleUtil.isGreaterEqual(parameter, 0) && DoubleUtil.isGreaterEqual(1, parameter);
 }
 public void setPoints(GeoPoint3D start, GeoPoint3D end) {
  startPoint = start;
  endPoint = end;
 }
 public GeoPointND setStandardStartPoint() {
  return startPoint;
 }
 public void setCoords(MyPoint locusPoint, MyPoint locusPoint2) {
  setCoordFromPoints(
    new Coords(locusPoint.x, locusPoint.y, locusPoint.getZ(), 1.0),
    new Coords(locusPoint2.x, locusPoint2.y, locusPoint2.getZ(), 1.0));
 }
 public GeoElement copyFreeSegment() {
  GeoPointND startPoint1 = (GeoPointND) getStartPoint().copyInternal(cons);
  GeoPointND endPoint1 = (GeoPointND) getEndPoint().copyInternal(cons);
  AlgoJoinPoints3D algo =
    new AlgoJoinPoints3D(cons, startPoint1, endPoint1, null, GeoClass.SEGMENT3D);
  return algo.getOutput(0);
 }
 public boolean setCoord(GeoPointND O, GeoPointND I) {
  if (super.setCoord(O, I)) {
   setUndefined();
   return true;
  }
  return false;
 }
 public ValueType getValueType() {
  return ValueType.NUMBER;
 }
 public final void setStartPoint(GeoPointND P) {
  startPoint = P;
 }
 public ExtendedBoolean isCongruent(GeoElement geo) {
  return ExtendedBoolean.newExtendedBoolean(
    geo.isGeoSegment() && DoubleUtil.isEqual(getLength(), ((GeoSegmentND) geo).getLength()));
 }
 public Coords getOrigin() {
  return getCoordSys().getOrigin();
 }
 public final void setChangeableParentIfNull(ChangeableParent cp) {
  if (changeableParent == null) {
   changeableParent = cp;
  }
 }
 public boolean hasChangeableParent3D() {
  return changeableParent != null;
 }
 public ChangeableParent getChangeableParent3D() {
  return changeableParent;
 }
 public boolean isWhollyIn2DView(EuclidianView ev) {
  return DoubleUtil.isZero(getStartPoint().getInhomCoords().getZ())
    && DoubleUtil.isZero(getEndPoint().getInhomCoords().getZ());
 }
 public void toGeoCurveCartesian(GeoCurveCartesianND curve) {
  curve.setFromPolyLine(new GeoPointND[] {startPoint, endPoint}, false);
 }
 public boolean isDefined() {
  return super.isDefined() || coordsys.hasZeroVx();
 }
 public void setToParametricForm(String parameter) {
  setEquationForm(Form.PARAMETRIC);
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoSpace.java
```java
public class GeoSpace extends GeoElement3D implements GeoDirectionND {
 public GeoSpace(Construction c) {
  super(c);
  label = "space";
  setLabelSet(true);
  setFixed(true);
 }
 public Coords getLabelPosition() {
  return null;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.SPACE;
 }
 public GeoElement copy() {
  return new GeoSpace(cons);
 }
 public void set(GeoElementND geo) {
 }
 public boolean isDefined() {
  return true;
 }
 public void setUndefined() {
 }
 public String toValueString(StringTemplate tpl) {
  return "";
 }
 public boolean showInAlgebraView() {
  return false;
 }
 protected boolean showInEuclidianView() {
  return false;
 }
 public boolean isAvailableAtConstructionStep(int step) {
  return true;
 }
 public Coords getDirectionInD3() {
  return null;
 }
 public String getLabel(StringTemplate tpl) {
  if (tpl.isPrintLocalizedCommandNames()) {
   return getLoc().getMenu(label);
  }
  return label;
 }
 public final HitType getLastHitType() {
  return HitType.NONE;
 }
 public ValueType getValueType() {
  return ValueType.VOID;
 }
 public boolean isVisibleInputForMacro() {
  return false;
 }
 public boolean isProtected(EventType eventType) {
  return true;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoSurfaceCartesian3D.java
```java
public class GeoSurfaceCartesian3D extends GeoSurfaceCartesianND
  implements Functional2Var, Traceable, Region, MirrorableAtPlane, RotatableND, Transformable {
 private boolean isSurfaceOfRevolutionAroundOx = false;
 private CoordMatrix4x4 tmpMatrix4x4;
 private double[] xyzuv;
 private double lastHitU;
 private double lastHitV;
 private double[] tmp = new double[2];
 private boolean trace;
 private boolean hasLastHitParameters = false;
 private Coords der1 = new Coords(3);
 private Coords der2 = new Coords(3);
 private Coords normal = new Coords(3);
 private CoordsDouble3 p1 = new CoordsDouble3();
 private CoordsDouble3 p2 = new CoordsDouble3();
 private ChangeableParent changeableParent;
 public GeoSurfaceCartesian3D(Construction c) {
  super(c);
  isSurfaceOfRevolutionAroundOx = false;
 }
 public GeoSurfaceCartesian3D(Construction c, ExpressionNode point, FunctionNVar[] fun) {
  super(c, point, fun);
  isSurfaceOfRevolutionAroundOx = false;
 }
 public GeoSurfaceCartesian3D(GeoSurfaceCartesian3D surface) {
  super(surface.cons);
  set(surface);
 }
 public void evaluatePoint(double u, double v, Coords3 p) {
  tmp[0] = u;
  tmp[1] = v;
  p.set(fun[0].evaluate(tmp), fun[1].evaluate(tmp), fun[2].evaluate(tmp));
 }
 private boolean setNormalFromNeighbours(Coords3 p, double u, double v, Coords3 n) {
  evaluatePoint(u + SurfaceEvaluable.NUMERICAL_DELTA, v, p1);
  if (!p1.isDefined()) {
   return false;
  }
  evaluatePoint(u, v + SurfaceEvaluable.NUMERICAL_DELTA, p2);
  if (!p2.isDefined()) {
   return false;
  }
  der1.setX(p1.x - p.getXd());
  der1.setY(p1.y - p.getYd());
  der1.setZ(p1.z - p.getZd());
  der2.setX(p2.x - p.getXd());
  der2.setY(p2.y - p.getYd());
  der2.setZ(p2.z - p.getZd());
  normal.setCrossProduct3(der1, der2);
  n.setNormalizedIfPossible(normal);
  return true;
 }
 public boolean evaluateNormal(Coords3 p, double u, double v, Coords3 n) {
  tmp[0] = u;
  tmp[1] = v;
  double val;
  for (int i = 0; i < 3; i++) {
   val = fun1evaluate(0, i, tmp);
   if (Double.isNaN(val)) {
    return setNormalFromNeighbours(p, u, v, n);
   }
   der1.set(i + 1, val);
   val = fun1evaluate(1, i, tmp);
   if (Double.isNaN(val)) {
    return setNormalFromNeighbours(p, u, v, n);
   }
   der2.set(i + 1, val);
  }
  normal.setCrossProduct3(der1, der2);
  n.setNormalizedIfPossible(normal);
  return true;
 }
 public void setJacobianForBivariate(
   double[] uv, double vx, double vy, double vz, CoordMatrix matrix) {
  final double dfxu = fun1evaluate(0, 0, uv);
  final double dfyu = fun1evaluate(0, 1, uv);
  final double dfzu = fun1evaluate(0, 2, uv);
  final double dfxv = fun1evaluate(1, 0, uv);
  final double dfyv = fun1evaluate(1, 1, uv);
  final double dfzv = fun1evaluate(1, 2, uv);
  matrix.set(1, 1, vz * dfyu - vy * dfzu);
  matrix.set(1, 2, vz * dfyv - vy * dfzv);
  matrix.set(2, 1, vx * dfzu - vz * dfxu);
  matrix.set(2, 2, vx * dfzv - vz * dfxv);
 }
 public void setVectorForBivariate(
   double[] uv,
   double[] xyz,
   double vx,
   double vy,
   double vz,
   double cx,
   double cy,
   double cz,
   Coords vector) {
  xyz[0] = fun[0].evaluate(uv);
  xyz[1] = fun[1].evaluate(uv);
  xyz[2] = fun[2].evaluate(uv);
  vector.setX(vz * xyz[1] - vy * xyz[2] + cx);
  vector.setY(vx * xyz[2] - vz * xyz[0] + cy);
  vector.setZ(vy * xyz[0] - vx * xyz[1] + cz);
 }
 public GeoElement copy() {
  return new GeoSurfaceCartesian3D(this);
 }
 public void set(GeoElementND geo) {
  super.set(geo);
  if (geo instanceof GeoSurfaceCartesian3D) {
   GeoSurfaceCartesian3D geoSurface = (GeoSurfaceCartesian3D) geo;
   isSurfaceOfRevolutionAroundOx = geoSurface.isSurfaceOfRevolutionAroundOx;
  }
 }
 protected boolean showInEuclidianView() {
  return true;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.SURFACECARTESIAN3D;
 }
 public Coords getLabelPosition() {
  return Coords.O; 
 }
 public Coords getMainDirection() {
  return Coords.VZ; 
 }
 public boolean isGeoElement3D() {
  return true;
 }
 public boolean isFillable() {
  return true;
 }
 public void evaluatePoint(double u, double v, Coords p) {
  tmp[0] = u;
  tmp[1] = v;
  for (int i = 0; i < 3; i++) {
   p.set(i + 1, fun[i].evaluate(tmp));
  }
 }
 public Coords evaluateNormal(double u, double v) {
  Coords n = new Coords(4);
  tmp[0] = u;
  tmp[1] = v;
  double val;
  for (int i = 0; i < 3; i++) {
   val = fun1evaluate(0, i, tmp);
   der1.set(i + 1, val);
   val = fun1evaluate(1, i, tmp);
   der2.set(i + 1, val);
  }
  n.setCrossProduct4(der1, der2);
  n.normalize();
  return n;
 }
 protected void getStyleXML(XMLStringBuilder sb) {
  super.getStyleXML(sb);
  if (getLevelOfDetail() == LevelOfDetail.QUALITY) {
   sb.startTag("levelOfDetailQuality").attr("val", true).endTag();
  }
 }
 public boolean isTraceable() {
  return true;
 }
 public void setTrace(boolean trace) {
  this.trace = trace;
 }
 public boolean getTrace() {
  return trace;
 }
 public final HitType getLastHitType() {
  return HitType.ON_FILLING;
 }
 public void setAllVisualPropertiesExceptEuclidianVisible(
   GeoElement geo, boolean keepAdvanced, boolean setAuxiliaryProperty) {
  super.setAllVisualPropertiesExceptEuclidianVisible(geo, keepAdvanced, setAuxiliaryProperty);
  if (geo.hasLevelOfDetail()) {
   setLevelOfDetail(((SurfaceEvaluable) geo).getLevelOfDetail());
  }
 }
 public ValueType getValueType() {
  return ValueType.PARAMETRIC3D;
 }
 public ExpressionValue evaluateSurface(double u, double v) {
  tmp[0] = u;
  tmp[1] = v;
  return new Geo3DVec(kernel, fun[0].evaluate(tmp), fun[1].evaluate(tmp), fun[2].evaluate(tmp));
 }
 public void pointChangedForRegion(GeoPointND P) {
  GeoPoint3D p = (GeoPoint3D) P;
  if (hasLastHitParameters()) {
   RegionParameters rp = P.getRegionParameters();
   rp.setT1(lastHitU);
   rp.setT2(lastHitV);
   Coords c = Coords.createInhomCoorsInD3();
   evaluatePoint(lastHitU, lastHitV, c);
   setDerivatives();
   Coords n = evaluateNormal(lastHitU, lastHitV);
   rp.setNormal(n);
   p.setCoords(c, false);
   p.updateCoords();
   p.setWillingCoordsUndefined();
   p.setWillingDirectionUndefined();
   resetLastHitParameters();
   return;
  }
  Coords coords, direction;
  if (p.hasWillingCoords()) { 
   coords = p.getWillingCoords();
  } else {
   coords = p.getInhomCoordsInD3();
  }
  if (xyzuv == null) {
   xyzuv = new double[5];
  }
  if (p.hasWillingDirection()) {
   direction = p.getWillingDirection();
   RegionParameters rp = p.getRegionParameters();
   if (getClosestParameters(
     rp.getT1(),
     rp.getT2(),
     coords.getX(),
     coords.getY(),
     coords.getZ(),
     direction.getX(),
     direction.getY(),
     direction.getZ(),
     xyzuv)) {
    rp.setT1(xyzuv[3]);
    rp.setT2(xyzuv[4]);
    Coords n = evaluateNormal(xyzuv[3], xyzuv[4]);
    rp.setNormal(n);
    p.setCoords(new Coords(xyzuv[0], xyzuv[1], xyzuv[2], 1), false);
    p.updateCoords();
   }
   p.setWillingCoordsUndefined();
   p.setWillingDirectionUndefined();
   resetLastHitParameters();
   return;
  }
  getClosestParameters(coords.getX(), coords.getY(), coords.getZ(), xyzuv);
  RegionParameters rp = p.getRegionParameters();
  rp.setT1(xyzuv[3]);
  rp.setT2(xyzuv[4]);
  Coords n = evaluateNormal(xyzuv[3], xyzuv[4]);
  rp.setNormal(n);
  p.setCoords(new Coords(xyzuv[0], xyzuv[1], xyzuv[2], 1), false);
  p.updateCoords();
  p.setWillingCoordsUndefined();
  p.setWillingDirectionUndefined();
  resetLastHitParameters();
 }
 public boolean getBestCollinear(
   double x0,
   double xMax,
   double y0,
   double z0,
   double vx,
   double vy,
   double vz,
   double vSquareNorm,
   double[] xyzuvOut) {
  if (jacobian == null) {
   jacobian = new CoordMatrix(2, 2);
   bivariateVector = new Coords(3);
   bivariateDelta = new Coords(2);
   uv = new double[2];
   xyz = new double[3];
  }
  double uMin, uMax;
  if (isSurfaceOfRevolutionAroundOx) {
   uMin = x0;
   uMax = xMax;
  } else {
   uMin = getMinParameter(0);
   uMax = getMaxParameter(0);
  }
  double vMin = getMinParameter(1);
  double vMax = getMaxParameter(1);
  double gxc = z0 * vy - vz * y0;
  double gyc = x0 * vz - vx * z0;
  double gzc = y0 * vx - vy * x0;
  double finalError = Double.NaN;
  double dotProduct = -1;
  double du = (uMax - uMin) / BIVARIATE_SAMPLES;
  double dv = (vMax - vMin) / BIVARIATE_SAMPLES;
  for (int ui = 0; ui <= BIVARIATE_SAMPLES; ui++) {
   uv[0] = uMin + ui * du;
   for (int vi = 0; vi <= BIVARIATE_SAMPLES; vi++) {
    uv[1] = vMin + vi * dv;
    double error =
      findBivariateCollinear(x0, y0, z0, vx, vy, vz, vSquareNorm, gxc, gyc, gzc, uv);
    if (!Double.isNaN(error)) {
     double d = (xyz[0] - x0) * vx + (xyz[1] - y0) * vy + (xyz[2] - z0) * vz;
     if (d >= 0) {
      if (dotProduct < 0 || d < dotProduct) {
       dotProduct = d;
       finalError = error;
       xyzuvOut[0] = xyz[0];
       xyzuvOut[1] = xyz[1];
       xyzuvOut[2] = xyz[2];
       xyzuvOut[3] = uv[0];
       xyzuvOut[4] = uv[1];
      }
     }
    }
   }
  }
  return !Double.isNaN(finalError);
 }
 private double findBivariateCollinear(
   final double x0,
   final double y0,
   final double z0,
   final double vx,
   final double vy,
   final double vz,
   final double vSquareNorm,
   final double gxc,
   final double gyc,
   final double gzc,
   double[] uvParams) {
  for (int i = 0; i < BIVARIATE_JUMPS; i++) {
   setVectorForBivariate(uvParams, xyz, vx, vy, vz, gxc, gyc, gzc, bivariateVector);
   double dx = xyz[0] - x0;
   double dy = xyz[1] - y0;
   double dz = xyz[2] - z0;
   double d = dx * dx + dy * dy + dz * dz;
   double error = bivariateVector.dotproduct3(bivariateVector);
   if (error < Kernel.STANDARD_PRECISION * vSquareNorm * d) {
    return error;
   }
   setJacobianForBivariate(uvParams, vx, vy, vz, jacobian);
   jacobian.pivotDegenerate(bivariateDelta, bivariateVector);
   if (!bivariateDelta.isDefined()) {
    return Double.NaN;
   }
   uvParams[0] -= bivariateDelta.getX();
   uvParams[1] -= bivariateDelta.getY();
   randomBackInIntervalsIfNeeded(uvParams);
  }
  return Double.NaN;
 }
 public void regionChanged(GeoPointND P) {
  pointChangedForRegion(P);
 }
 public boolean isInRegion(GeoPointND P) {
  return false;
 }
 public boolean isInRegion(double x0, double y0) {
  return false;
 }
 public void resetLastHitParameters() {
  hasLastHitParameters = false;
 }
 private boolean hasLastHitParameters() {
  return hasLastHitParameters;
 }
 public void setLastHitParameters(double u, double v) {
  lastHitU = u;
  lastHitV = v;
  hasLastHitParameters = true;
 }
 public boolean isSurfaceOfRevolutionAroundOx() {
  return isSurfaceOfRevolutionAroundOx;
 }
 public void setIsSurfaceOfRevolutionAroundOx(boolean flag) {
  isSurfaceOfRevolutionAroundOx = flag;
 }
 public int getMinimumLineThickness() {
  return 0;
 }
 public boolean hasFillType() {
  return false;
 }
 public void setLineThicknessOrVisibility(final int th) {
  setLineThickness(th);
 }
 public void printCASEvalMapXML(XMLStringBuilder sb) {
 }
 public void updateCASEvalMap(TreeMap<String, String> map) {
 }
 public void setFun(FunctionNVar[] fun) {
  this.fun = fun;
  this.fun1 = null;
  this.fun2 = null;
 }
 public void mirror(GeoLineND line) {
  SurfaceTransform.mirror(fun, kernel, line);
 }
 public void mirror(GeoCoordSys2D plane) {
  SurfaceTransform.mirror(fun, kernel, plane);
 }
 public void rotate(NumberValue r, GeoPointND S) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  SurfaceTransform.rotate(fun, kernel, r, S, tmpMatrix4x4);
 }
 public void rotate(NumberValue r) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  SurfaceTransform.rotate(fun, kernel, r, tmpMatrix4x4);
 }
 public void rotate(NumberValue r, Coords S, GeoDirectionND orientation) {
  if (tmpMatrix4x4 == null) {
   tmpMatrix4x4 = new CoordMatrix4x4();
  }
  SurfaceTransform.rotate(fun, kernel, r, S, orientation, tmpMatrix4x4);
 }
 public AutoColor getAutoColorScheme() {
  return AutoColor.SURFACES;
 }
 public boolean hasChangeableParent3D() {
  return changeableParent != null;
 }
 public ChangeableParent getChangeableParent3D() {
  return changeableParent;
 }
 public final void setChangeableParent(ChangeableParent cp) {
  changeableParent = cp;
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoTriangulatedSurface3D.java
```java
public class GeoTriangulatedSurface3D {
 private static final int DEFAULT_CAPACITY = 1024;
 private int capacity = DEFAULT_CAPACITY;
 private int current;
 private int restore;
 private int counter;
 private MyPoint3D[] vertices;
 private MyPoint3D[] normals;
 public GeoTriangulatedSurface3D() {
  this.vertices = new MyPoint3D[capacity];
  this.normals = new MyPoint3D[capacity];
 }
 public void clear() {
  this.current = 0;
  this.counter = 0;
 }
 public void beginTriangulation() {
  if (this.counter == 0) {
   this.restore = this.current;
  }
 }
 public void endTriangulation() {
  if (counter < 3) {
   this.current = this.restore;
  }
  counter = 0;
 }
 public void insertPoint(double x, double y, double z) {
  insertPoint(new double[] {x, y, z}, new double[] {0, 0, 0});
 }
 public void insertPoint(double[] p, double[] n) {
  ensureCapacity(current);
  if (vertices[current] != null) {
   vertices[current].setLocation(p[0], p[1], p[2]);
   vertices[current].setLineTo(counter != 0);
   normals[current].setLocation(n[0], n[1], n[2]);
  } else {
   vertices[current] =
     new MyPoint3D(p[0], p[1], p[2], counter != 0 ? SegmentType.LINE_TO : SegmentType.MOVE_TO);
   normals[current] = new MyPoint3D(n[0], n[1], n[2], SegmentType.MOVE_TO);
  }
  ++current;
  ++counter;
 }
 private void ensureCapacity(int size) {
  if (size >= capacity) {
   capacity = Integer.highestOneBit(size) << 1;
   MyPoint3D[] temp = new MyPoint3D[capacity];
   System.arraycopy(vertices, 0, temp, 0, size);
   this.vertices = temp;
   temp = new MyPoint3D[capacity];
   System.arraycopy(normals, 0, temp, 0, size);
   this.normals = temp;
  }
 }
 public MyPoint3D[] getPoints() {
  return vertices;
 }
 public MyPoint3D[] getNormals() {
  return normals;
 }
 public int size() {
  return this.current - this.counter;
 }
 public SurfaceMover getSurfaceMover() {
  return new SurfaceMover(this);
 }
 public static class SurfaceMover {
  private final int size;
  private int next;
  private MyPoint3D[] points;
  private MyPoint3D[] normals;
  private Triangle current = new Triangle(
    new CoordsDouble3(0, 0, 0), new CoordsDouble3(0, 0, 0), new CoordsDouble3(0, 0, 0));
  public SurfaceMover(GeoTriangulatedSurface3D surf) {
   this.size = surf.size();
   this.points = new MyPoint3D[this.size];
   this.normals = new MyPoint3D[this.size];
   System.arraycopy(surf.getPoints(), 0, this.points, 0, this.size);
   System.arraycopy(surf.getNormals(), 0, this.normals, 0, this.size);
   next = 2;
  }
  public boolean hasNext() {
   return next < size;
  }
  public Triangle next() {
   set(current.v1, points[next]);
   set(current.v2, points[next - 1]);
   set(current.v3, points[next - 2]);
   set(current.n1, normals[next]);
   set(current.n2, normals[next - 1]);
   set(current.n3, normals[next - 2]);
   next++;
   if (next < size && !points[next].getLineTo()) {
    next += 2;
   }
   return current;
  }
  private static void set(Coords3 c, MyPoint3D p) {
   c.set(p.x, p.y, p.z);
  }
  public int getTrianglesCount() {
   return size / 3;
  }
 }
 public static class Triangle {
  private static final Coords3 UNDEFINED = new CoordsDouble3();
  public Coords3 v1;
  public Coords3 n1;
  public Coords3 v2;
  public Coords3 n2;
  public Coords3 v3;
  public Coords3 n3;
  public Triangle(Coords3 c1, Coords3 c2, Coords3 c3) {
   this(c1, c2, c3, UNDEFINED.copyVector(), UNDEFINED.copyVector(), UNDEFINED.copyVector());
  }
  public Triangle(Coords3 c1, Coords3 c2, Coords3 c3, Coords3 n1, Coords3 n2, Coords3 n3) {
   this.v1 = c1;
   this.v2 = c2;
   this.v3 = c3;
   this.n1 = n1;
   this.n2 = n2;
   this.n3 = n3;
  }
  public String toString() {
   return "[" + toString(v1) + toString(v2) + toString(v3) + "]";
  }
  private static String toString(Coords3 c) {
   return "(" + c.getXd() + "," + c.getYd() + "," + c.getZd() + ")";
  }
 }
}
```

### FILE: geogebra3D/kernel3D/geos/GeoVec4D.java
```java
public abstract class GeoVec4D extends GeoElement3D
  implements GeoCoords4D, Vector3DValue, Traceable, SpreadsheetTraceable {
 protected Coords v;
 protected int toStringMode = Kernel.COORD_CARTESIAN;
 public GeoVec4D(Construction c) {
  super(c);
  v = new Coords(4);
  setConstructionDefaults(); 
 }
 public GeoVec4D(Construction c, double x, double y, double z, double w) {
  this(c);
  setCoords(x, y, z, w);
 }
 public void setCoords(double x, double y, double z, double w) {
  setCoords(new double[] {x, y, z, w});
 }
 public void setCoords(double x, double y, double w) {
  setCoords(x, y, 0, w);
 }
 public double getX() {
  return getCoords().get(1);
 }
 public double getY() {
  return getCoords().get(2);
 }
 public double getZ() {
  return getCoords().get(3);
 }
 public double getW() {
  return getCoords().get(4);
 }
 protected void getXMLTags(XMLStringBuilder sb) {
  super.getXMLTags(sb);
  sb.startTag("coords")
    .attr("x", getX())
    .attr("y", getY())
    .attr("z", getZ())
    .attr("w", getW())
    .endTag();
 }
 public void setMode(int mode) {
  toStringMode = mode;
 }
 public final boolean hasCoords() {
  return true;
 }
 public void setCoords(Coords vals) {
  setDefinition(null);
  v.set(vals);
 }
 public void setCoords(double[] vals) {
  setDefinition(null);
  v.set(vals);
 }
 public void setCoords(GeoVec4D vec) {
  setCoords(vec.v);
 }
 public final void setCoords(GeoPointND p) {
  setCoords(p.getCoordsInD3());
 }
 public final Coords getCoords() {
  return v;
 }
 public void translate(Coords v0) {
  v.addInside(v0);
  setCoords(v);
 }
 public boolean hasSpecialEditor() {
  return isIndependent()
    || getDefinition() != null && getDefinition().unwrap() instanceof MyVecNDNode;
 }
 public final int getToStringMode() {
  return toStringMode;
 }
 public void applyToStringModeFrom(GeoElement other) {
  if (other instanceof VectorNDValue) {
   toStringMode = ((VectorNDValue) other).getToStringMode();
  }
 }
}
```
