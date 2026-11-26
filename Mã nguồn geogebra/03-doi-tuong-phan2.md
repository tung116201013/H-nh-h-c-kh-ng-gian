# 03-doi-tuong-phan2.md

Nguồn: GeoGebra (EUPL v1.2). Mã Java đã bỏ bình luận/import để gọn. Chỉ để ĐỌC lấy ý tưởng thuật toán, viết lại bằng JavaScript.

Nội dung: Các đối tượng hình học 3D (Geo*): điểm, đường, đoạn, mặt phẳng, đa giác, đa diện, mặt cầu/nón/trụ

Danh sách file trong phần này:
- GeoVector3D.java
- SurfaceTransform.java

### FILE: geogebra3D/kernel3D/geos/GeoVector3D.java
```java
public class GeoVector3D extends GeoVec4D
  implements GeoVectorND,
    RotatableND,
    MirrorableAtPlane,
    Transformable,
    Dilateable,
    MatrixTransformable,
    HasHeadStyle {
 private GeoPointND startPoint;
 private CoordMatrix matrix;
 private Coords labelPosition = new Coords(0, 0, 0, 0);
 private final StringBuilder sbBuildValueString = new StringBuilder(50);
 private final StringBuilder sbToString = new StringBuilder(50);
 private StringBuilder sb;
 private boolean trace;
 private VectorToMatrix converter = null;
 public GeoVector3D(Construction c) {
  super(c);
  matrix = new CoordMatrix(4, 2);
  setCartesian3D();
 }
 public GeoVector3D(Construction c, double x, double y, double z) {
  super(c, x, y, z, 0);
  matrix = new CoordMatrix(4, 2);
  setCartesian3D();
 }
 public void setCoords(double[] vals) {
  super.setCoords(vals);
  if (matrix == null) {
   matrix = new CoordMatrix(4, 2);
  }
  matrix.set(getCoords(), 1);
 }
 public void updateStartPointPosition() {
  if (startPoint != null) {
   matrix.set(startPoint.getInhomCoordsInD3(), 2);
  } else {
   for (int i = 1; i < 4; i++) {
    matrix.set(i, 2, 0.0);
   }
   matrix.set(4, 2, 1.0);
  }
  labelPosition = matrix.getOrigin().add(matrix.getVx().mul(0.5));
 }
 public Coords getLabelPosition() {
  return labelPosition;
 }
 public GeoElement copy() {
  GeoVector3D ret = new GeoVector3D(getConstruction());
  ret.set(this);
  return ret;
 }
 public GeoClass getGeoClassType() {
  return GeoClass.VECTOR3D;
 }
 public boolean isDefined() {
  return !(Double.isNaN(getX())
    || Double.isNaN(getY())
    || Double.isNaN(getZ())
    || Double.isNaN(getW()));
 }
 public ExtendedBoolean isEqualExtended(GeoElementND geo) {
  if (!geo.isGeoVector()) {
   return ExtendedBoolean.FALSE;
  }
  GeoVectorND v1 = (GeoVectorND) geo;
  if (!(isFinite() && v1.isFinite())) {
   return ExtendedBoolean.FALSE;
  }
  Coords c1 = getCoords();
  Coords c2 = v1.getCoordsInD3();
  return ExtendedBoolean.newExtendedBoolean(DoubleUtil.isEqual(c1.getX(), c2.getX())
    && DoubleUtil.isEqual(c1.getY(), c2.getY())
    && DoubleUtil.isEqual(c1.getZ(), c2.getZ()));
 }
 public final boolean isInfinite() {
  Coords v1 = getCoords();
  return Double.isInfinite(v1.getX())
    || Double.isInfinite(v1.getY())
    || Double.isInfinite(v1.getZ());
 }
 public final boolean isFinite() {
  return !isInfinite();
 }
 public void set(GeoElementND geo) {
  if (geo.isGeoPoint()) {
   GeoPointND p = (GeoPointND) geo;
   setCoords(p.getCoordsInD3().get());
  } else if (geo.isGeoVector()) {
   GeoVectorND vec = (GeoVectorND) geo;
   setCoords(vec.getCoordsInD3().get());
   reuseDefinition(geo);
   if (geo.getConstruction() != cons && isAlgoMacroOutput()) {
    return;
   }
   try {
    GeoPointND sp = vec.getStartPoint();
    if (sp != null) {
     if (vec.hasStaticLocation()) {
      setStartPoint(sp.copy());
     } else {
      setStartPoint(sp);
     }
    }
   } catch (CircularDefinitionException e) {
    Log.debug("set GeoVector3D: CircularDefinitionException");
   }
  }
 }
 public void setUndefined() {
  setCoords(Double.NaN, Double.NaN, Double.NaN, Double.NaN);
 }
 protected boolean showInEuclidianView() {
  return isDefined() && !isInfinite();
 }
 public boolean evaluatesTo3DVector() {
  return true;
 }
 public boolean isPath() {
  return true;
 }
 public boolean isGeoVector() {
  return true;
 }
 public final String toString(StringTemplate tpl) {
  sbToString.setLength(0);
  sbToString.append(label);
  switch (tpl.getCoordStyle(kernel.getCoordStyle())) {
   case Kernel.COORD_STYLE_FRENCH:
    sbToString.append(": ");
    break;
   case Kernel.COORD_STYLE_AUSTRIAN:
    break;
   default:
    sbToString.append(" = ");
  }
  sbToString.append(buildValueString(tpl));
  return sbToString.toString();
 }
 public final String toValueString(StringTemplate tpl) {
  if (tpl.isDisplayStyle()) {
   return toLaTeXString(false, tpl);
  }
  return buildValueString(tpl).toString();
 }
 public boolean evaluatesToVectorNotPoint() {
  return true;
 }
 private StringBuilder buildValueString(StringTemplate tpl) {
  sbBuildValueString.setLength(0);
  if (tpl.getStringType() == ExpressionNodeConstants.StringType.GIAC) {
   sbBuildValueString.append("ggbvect[");
   sbBuildValueString.append(kernel.format(getX(), tpl));
   sbBuildValueString.append(',');
   sbBuildValueString.append(kernel.format(getY(), tpl));
   sbBuildValueString.append(',');
   sbBuildValueString.append(kernel.format(getZ(), tpl));
   sbBuildValueString.append("]");
   return sbBuildValueString;
  }
  sbBuildValueString.append("(");
  sbBuildValueString.append(kernel.format(getX(), tpl));
  setCoordSep(tpl);
  sbBuildValueString.append(kernel.format(getY(), tpl));
  setCoordSep(tpl);
  sbBuildValueString.append(kernel.format(getZ(), tpl));
  sbBuildValueString.append(")");
  return sbBuildValueString;
 }
 private void setCoordSep(StringTemplate tpl) {
  if (tpl.getCoordStyle(kernel.getCoordStyle()) == Kernel.COORD_STYLE_AUSTRIAN) {
   sbBuildValueString.append(" | ");
  } else {
   sbBuildValueString.append(", ");
  }
 }
 public String toLaTeXString(boolean symbolic, StringTemplate tpl) {
  resetStringBuilder();
  if (getToStringMode() == Kernel.COORD_CARTESIAN_3D) {
   GeoVector.buildLatexValueStringCoordCartesian3D(
     kernel, tpl, getX(), getY(), getZ(), sb, this, symbolic);
   return sb.toString();
  }
  if (getToStringMode() == Kernel.COORD_SPHERICAL) {
   GeoPoint.buildValueStringCoordSpherical(kernel, tpl, getX(), getY(), getZ(), sb);
   return sb.toString();
  }
  if (!DoubleUtil.isZero(getZ())) {
   if (getToStringMode() == Kernel.COORD_POLAR) {
    GeoPoint.buildValueStringCoordSpherical(kernel, tpl, getX(), getY(), getZ(), sb);
   } else {
    GeoVector.buildLatexValueStringCoordCartesian3D(
      kernel, tpl, getX(), getY(), getZ(), sb, this, symbolic);
   }
   return sb.toString();
  }
  return GeoVector.buildLatexString(
    kernel, sb, symbolic, tpl, getToStringMode(), getX(), getY(), this);
 }
 private void resetStringBuilder() {
  if (sb == null) {
   sb = new StringBuilder();
  } else {
   sb.setLength(0);
  }
 }
 protected void getStyleXML(XMLStringBuilder sbXml) {
  super.getStyleXML(sbXml);
  switch (getToStringMode()) {
   case Kernel.COORD_POLAR:
    coordStyle(sbXml, "polar");
    break;
   case Kernel.COORD_COMPLEX:
    coordStyle(sbXml, "complex");
    break;
   case Kernel.COORD_CARTESIAN:
    coordStyle(sbXml, "cartesian");
    break;
   case Kernel.COORD_SPHERICAL:
    coordStyle(sbXml, "spherical");
    break;
   default:
  }
  getLineStyleXML(sbXml);
  if (startPoint != null) {
   startPoint.appendStartPointXML(sbXml, false);
  }
 }
 public GeoPointND getStartPoint() {
  return startPoint;
 }
 public void setStartPoint(GeoPointND p) throws CircularDefinitionException {
  if (startPoint == p) {
   return;
  }
  if (isAlgoMacroOutput()) {
   return;
  }
  if (isParentOf(p)) {
   throw new CircularDefinitionException();
  }
  if (startPoint != null) {
   startPoint.getLocateableList().unregisterLocateable(this);
  }
  startPoint = p;
  if (startPoint != null) {
   startPoint.getLocateableList().registerLocateable(this);
  }
 }
 public boolean hasStaticLocation() {
  return startPoint == null || startPoint.isAbsoluteStartPoint();
 }
 public void initStartPoint(GeoPointND p, int number) {
  startPoint = p;
 }
 public boolean isAlwaysFixed() {
  return false;
 }
 public void removeStartPoint(GeoPointND p) {
  if (startPoint == p) {
   try {
    setStartPoint(null);
   } catch (Exception ignored) {
   }
  }
 }
 public void setStartPoint(GeoPointND p, int number) throws CircularDefinitionException {
  setStartPoint(p);
 }
 public void setWaitForStartPoint() {
 }
 public Geo3DVec getVector() {
  return new Geo3DVec(kernel, v.getX(), v.getY(), v.getZ());
 }
 public double[] getPointAsDouble() {
  return new double[] {v.getX(), v.getY(), v.getZ()};
 }
 public Coords getCoordsInD2() {
  Coords ret = new Coords(3);
  ret.setValues(v, 3);
  return ret;
 }
 public Coords getCoordsInD3() {
  Coords ret = new Coords(4);
  ret.setValues(v, 4);
  return ret;
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
 public Coords getDirectionInD3() {
  return getCoordsInD3();
 }
 public boolean isLaTeXDrawableGeo() {
  return true;
 }
 public void getInhomCoords(double[] coords) {
  coords[0] = v.getX();
  coords[1] = v.getY();
  coords[2] = v.getZ();
 }
 public double[] getInhomCoords() {
  double[] coords = new double[3];
  getInhomCoords(coords);
  return coords;
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
  GeoNumeric xx = new GeoNumeric(cons, v.getX());
  spreadsheetTraceList.add(xx);
  GeoNumeric yy = new GeoNumeric(cons, v.getY());
  spreadsheetTraceList.add(yy);
  GeoNumeric zz = new GeoNumeric(cons, v.getZ());
  spreadsheetTraceList.add(zz);
 }
 public final boolean isCasEvaluableObject() {
  return true;
 }
 public void updateLocation() {
  updateGeo(false);
  kernel.notifyUpdateLocation(this);
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
 public final void rotate(NumberValue phiValue, GeoPointND Q) {
  rotate(phiValue);
 }
 public void rotate(NumberValue phiValue, Coords S, GeoDirectionND orientation) {
  Coords vn = orientation.getDirectionInD3();
  rotate(phiValue, vn);
 }
 private void rotate(NumberValue phiValue, Coords vn) {
  if (vn.isZero()) {
   setUndefined();
   return;
  }
  double phi = phiValue.getDouble();
  double cos = Math.cos(phi);
  double sin = Math.sin(phi);
  Coords vn2 = vn.normalized();
  Coords v2 = vn2.crossProduct4(v);
  Coords v1 = v2.crossProduct4(vn2);
  setCoords(v1.mul(cos).add(v2.mul(sin)).add(vn2.mul(v.dotproduct(vn2))));
 }
 public void mirror(Coords Q) {
  setCoords(v.mul(-1));
 }
 public void mirror(GeoLineND line) {
  Coords vn = line.getDirectionInD3().normalized();
  setCoords(vn.mul(2 * v.dotproduct(vn)).add(v.mul(-1)));
 }
 public void mirror(GeoCoordSys2D plane) {
  Coords vn = plane.getDirectionInD3().normalized();
  setCoords(v.add(vn.mul(-2 * v.dotproduct(vn))));
 }
 public void dilate(NumberValue rval, Coords S) {
  setCoords(v.mul(rval.getDouble()));
 }
 public boolean isMatrixTransformable() {
  return true;
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
 public boolean moveVector(Coords rwTransVec, Coords endPosition) {
  boolean movedGeo = false;
  if (endPosition == null) {
   Coords coords;
   Coords current = getCoords();
   if (current.getLength() < rwTransVec.getLength()) {
    coords = current.add(rwTransVec);
   } else {
    coords = current.addSmaller(rwTransVec);
   }
   setCoords(coords);
   movedGeo = true;
  }
  return movedGeo;
 }
 public ValueType getValueType() {
  return ValueType.VECTOR3D;
 }
 public int getDimension() {
  return 3;
 }
 public ValidExpression toValidExpression() {
  return getVector();
 }
 public String toValueStringAsColumnVector(StringTemplate tpl) {
  return buildColumnVectorValueString(tpl);
 }
 private String buildColumnVectorValueString(StringTemplate tpl) {
  if (getToStringMode() != Kernel.COORD_CARTESIAN
    && getToStringMode() != Kernel.COORD_CARTESIAN_3D) {
   return buildValueString(tpl).toString();
  }
  return getConverter().build(tpl, getDefinition(), getX(), getY(), getZ());
 }
 private VectorToMatrix getConverter() {
  if (converter == null) {
   converter = new VectorToMatrix(kernel);
  }
  return converter;
 }
 public VectorHeadStyle getHeadStyle() {
  return VectorHeadStyle.DEFAULT;
 }
 public void setHeadStyle(VectorHeadStyle headStyle) {
 }
}
```

### FILE: geogebra3D/kernel3D/geos/SurfaceTransform.java
```java
public class SurfaceTransform {
 public static void transform(FunctionNVar[] fun, Kernel kernel, CoordMatrix4x4 m) {
  ExpressionNode[] expr = new ExpressionNode[3];
  for (int i = 0; i < 3; i++) {
   expr[i] = fun[i].deepCopy(kernel).getExpression();
  }
  for (int row = 0; row < 3; row++) {
   MyDouble[] coeff = new MyDouble[4];
   for (int i = 0; i < 4; i++) {
    coeff[i] = new MyDouble(kernel, m.get(row + 1, i + 1));
   }
   ExpressionNode trans = new ExpressionNode(kernel, coeff[3]);
   for (int i = 0; i < 3; i++) {
    trans = trans.plus(expr[i].multiply(coeff[i]));
   }
   fun[row].setExpression(trans);
  }
 }
 public static void mirror(FunctionNVar[] fun, Kernel kernel, GeoCoordSys2D plane) {
  CoordMatrix4x4 m = plane.getCoordSys().getMatrixOrthonormal();
  transform(fun, kernel, CoordMatrix4x4.planeSymmetry(m.getVz(), m.getOrigin()));
 }
 public static void mirror(FunctionNVar[] fun, Kernel kernel, GeoLineND line) {
  transform(
    fun,
    kernel,
    CoordMatrix4x4.axialSymmetry(
      line.getDirectionInD3().normalized(), line.getStartInhomCoords()));
 }
 public static void rotate(
   FunctionNVar[] fun, Kernel kernel, NumberValue r, GeoPointND s, CoordMatrix4x4 tmpMatrix4x4) {
  CoordMatrix4x4.rotation4x4(r.getDouble(), s.getInhomCoordsInD3(), tmpMatrix4x4);
  transform(fun, kernel, tmpMatrix4x4);
 }
 public static void rotate(
   FunctionNVar[] fun, Kernel kernel, NumberValue r, CoordMatrix4x4 tmpMatrix4x4) {
  CoordMatrix4x4.rotation4x4(r.getDouble(), tmpMatrix4x4);
  transform(fun, kernel, tmpMatrix4x4);
 }
 public static void rotate(
   FunctionNVar[] fun,
   Kernel kernel,
   NumberValue r,
   Coords s,
   GeoDirectionND orientation,
   CoordMatrix4x4 tmpMatrix4x4) {
  CoordMatrix4x4.rotation4x4(
    orientation.getDirectionInD3().normalized(), r.getDouble(), s, tmpMatrix4x4);
  transform(fun, kernel, tmpMatrix4x4);
 }
 public static void rotate(
   FunctionNVar[] fun,
   Kernel kernel,
   NumberValue r,
   GeoLineND line,
   CoordMatrix4x4 tmpMatrix4x4) {
  CoordMatrix4x4.rotation4x4(
    line.getDirectionInD3().normalized(),
    r.getDouble(),
    line.getStartInhomCoords(),
    tmpMatrix4x4);
  transform(fun, kernel, tmpMatrix4x4);
 }
}
```
