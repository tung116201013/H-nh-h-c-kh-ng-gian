# 04-toan-hoc-nen-tang.md

Nguồn: GeoGebra (EUPL v1.2). Mã Java đã bỏ bình luận/import để gọn. Chỉ để ĐỌC lấy ý tưởng thuật toán, viết lại bằng JavaScript.

Nội dung: Toán nền: vector, hệ tọa độ, ma trận (Coords, CoordSys, CoordMatrix) và các lớp nền Geo/Algo phẳng

Danh sách file trong phần này:
- AlgoDistanceLineLine.java
- AlgoDistancePointObject.java
- AlgoDistancePoints.java
- AlgoIntersectCoordSysCurve.java
- AlgoOrthoLinePointConic.java
- AlgoOrthoLinePointLine.java
- AlgoOrthoLinePointVector.java
- AlgoSphereNDPointRadius.java
- AlgoSphereNDTwoPoints.java
- AlgoPlaneCoefficients.java
- PolyhedronNetConverter.java
- GeoCoordSys.java
- GeoCoordSys1DInterface.java
- GeoCoordSys2D.java
- GeoPolygon3DInterface.java
- GeoPolyhedronInterface.java
- GeoQuadric3DInterface.java
- GeoQuadric3DLimitedInterface.java
- GeoQuadric3DPartInterface.java
- GeoQuadricND.java
- GeoQuadricNDConstants.java
- AnimatableValue.java
- CoordMatrix.java
- CoordMatrix4x4.java
- CoordMatrixUtil.java
- CoordNearest.java
- CoordSys.java
- Coords.java
- Coords3.java
- CoordsDouble3.java
- Quaternion.java

### FILE: kernel/algos/AlgoDistanceLineLine.java
```java
public class AlgoDistanceLineLine extends AlgoElement {
 private GeoLine g; 
 private GeoLine h; 
 protected GeoNumeric dist;
 public AlgoDistanceLineLine(Construction cons, String label, GeoLine g, GeoLine h) {
  super(cons);
  this.h = h;
  this.g = g;
  dist = new GeoNumeric(cons);
  setInputOutput(); 
  compute();
  dist.setLabel(label);
 }
 public Commands getClassName() {
  return Commands.Distance;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_DISTANCE;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = h;
  input[1] = g;
  setOnlyOutput(dist);
  setDependencies(); 
 }
 public GeoNumeric getDistance() {
  return dist;
 }
 public void compute() {
  dist.setValue(g.distance(h));
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlainDefault(
      "DistanceOfAandB", "Distance between %0 and %1", g.getLabel(tpl), h.getLabel(tpl));
 }
}
```

### FILE: kernel/algos/AlgoDistancePointObject.java
```java
public class AlgoDistancePointObject extends AlgoElement implements DistanceAlgo {
 private static final double MAX_INTERVAL = 10000;
 private static final double MIN_INTERVAL = 200;
 private static final int FINE_TUNE_STEPS = 15;
 private GeoPointND P; 
 private GeoElementND g; 
 private GeoNumeric dist; 
 private AlgoClosestPoint closePt;
 public AlgoDistancePointObject(Construction cons, String label, GeoPointND P, GeoElementND g) {
  super(cons);
  this.P = P;
  this.g = g;
  dist = new GeoNumeric(cons);
  closePt = getKernel().getAlgoDispatcher().getNewAlgoClosestPoint(cons, (Path) g, P);
  cons.removeFromConstructionList(closePt);
  setInputOutput(); 
  compute();
  dist.setLabel(label);
 }
 public Commands getClassName() {
  return Commands.Distance;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_DISTANCE;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) P;
  input[1] = g.toGeoElement();
  setOnlyOutput(dist);
  setDependencies(); 
 }
 public GeoNumeric getDistance() {
  return dist;
 }
 GeoPointND getP() {
  return P;
 }
 GeoElementND getg() {
  return g;
 }
 public final void compute() {
  if (closePt != null) {
   dist.setValue(closePt.getP().distance(P));
  } else {
   dist.setValue(g.distance(P));
  }
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlainDefault(
      "DistanceOfAandB", "Distance between %0 and %1", P.getLabel(tpl), g.getLabel(tpl));
 }
 public static double getClosestFunctionValueToPoint(Function function, double x, double y) {
  Kernel kernel = function.getKernel();
  PolyFunction polyFunction =
    function.expandToPolyFunction(function.getExpression(), false, true);
  if (polyFunction != null) {
   return closestValPoly(polyFunction, x, y, kernel);
  }
  if (!Double.isFinite(function.value(x))) {
   double xLeft = getClosestDefined(function, x, y, -1);
   double xRight = getClosestDefined(function, x, y, 1);
   if (MyMath.distanceSquaredToFunctionAt(function, x, y, xLeft)
     < MyMath.distanceSquaredToFunctionAt(function, x, y, xRight)) {
    return xLeft;
   } else {
    return xRight;
   }
  }
  FunctionVariable fVar = function.getFunctionVariable();
  Function deriv = function.getDerivative(1, true);
  deriv.traverse(Traversing.Replacer.getReplacer(deriv.getFunctionVariable(), fVar));
  ExpressionNode expr =
    new ExpressionNode(kernel, fVar, Operation.MINUS, new MyDouble(kernel, x));
  expr = expr.multiply(2);
  ExpressionNode expr2 = new ExpressionNode(
    kernel, function.getExpression(), Operation.MINUS, new MyDouble(kernel, y));
  expr2 = expr2.multiplyR(deriv.getExpression());
  expr2 = expr2.multiply(2);
  expr = expr.plus(expr2);
  Function func = new Function(expr, fVar);
  func.initFunction();
  double minSq = MyMath.distanceSquaredToFunctionAt(function, x, y, x);
  double minAt = x;
  double min = Math.sqrt(minSq);
  double[] roots = AlgoRoots.findRoots(
    func, x - min, x + min, (int) MyMath.clamp(20 * min, MIN_INTERVAL, MAX_INTERVAL));
  if (roots == null || roots.length == 0) {
   return minAt;
  }
  for (double root : roots) {
   double val = MyMath.distanceSquaredToFunctionAt(function, x, y, root);
   if (DoubleUtil.isGreater(minSq, val)) {
    minSq = val;
    minAt = root;
   }
  }
  return minAt;
 }
 private static double getClosestDefined(Function function, double x, double y, double direction) {
  for (double offset = direction * 0.1;
    Math.abs(offset) < Kernel.INV_MAX_DOUBLE_PRECISION;
    offset *= 2) {
   if (!Double.isNaN(function.value(x + offset))) {
    return fineTuneClosestDefined(function, x + offset / 2, x + offset, x, y);
   }
  }
  return Double.NaN;
 }
 private static double fineTuneClosestDefined(
   Function function, double from, double to, double x, double y) {
  double x1 = from;
  double x2 = to;
  for (int i = 0; i < FINE_TUNE_STEPS; i++) {
   double d1 = MyMath.distanceSquaredToFunctionAt(function, x, y, x2);
   double midpoint = (x1 + x2) / 2;
   double d2 = MyMath.distanceSquaredToFunctionAt(function, x, y, midpoint);
   if (d1 < d2 || Double.isNaN(d2)) {
    x1 = midpoint;
   } else {
    x2 = midpoint;
   }
  }
  return x2;
 }
 public static double closestValPoly(
   PolyFunction polyFunction, double x, double y, Kernel kernel) {
  PolyFunction polyDervi = polyFunction.getDerivative();
  double[] funCoeffs = polyFunction.getCoeffs();
  double[] derivCoeffs = polyDervi.getCoeffs();
  int n = funCoeffs.length - 1;
  int m = derivCoeffs.length - 1;
  double[] eq = new double[(m + n < 1) ? 2 : m + n + 1];
  for (int i = 0; i < eq.length; i++) { 
   for (int j = Math.max(0, i - m); j <= Math.min(i, n); j++) { 
    eq[i] += 2 * funCoeffs[j] * derivCoeffs[i - j];
   }
  }
  for (int i = 0; i <= m; i++) {
   eq[i] += (-2) * y * derivCoeffs[i];
  }
  eq[1] += 2;
  eq[0] -= 2 * x;
  EquationSolver solver = new EquationSolver();
  int nrOfRoots = solver.polynomialRoots(eq, false);
  if (nrOfRoots == 0) {
   return Double.NaN;
  }
  int k = 0;
  double min = MyMath.distanceSquaredToFunctionAt(polyFunction, x, y, eq[0]);
  for (int i = 1; i < nrOfRoots; i++) {
   double val = MyMath.distanceSquaredToFunctionAt(polyFunction, x, y, eq[i]);
   if (DoubleUtil.isGreater(min, val)) {
    min = val;
    k = i;
   }
  }
  return eq[k];
 }
}
```

### FILE: kernel/algos/AlgoDistancePoints.java
```java
public class AlgoDistancePoints extends AlgoElement
  implements DistanceAlgo, SymbolicParametersBotanaAlgo {
 private GeoPointND P; 
 private GeoPointND Q; 
 private GeoNumeric dist; 
 private PVariable[] botanaVars;
 public AlgoDistancePoints(Construction cons, GeoPointND P, GeoPointND Q) {
  super(cons);
  this.P = P;
  this.Q = Q;
  dist = new GeoNumeric(cons);
  setInputOutput(); 
  compute();
 }
 public Commands getClassName() {
  return Commands.Distance;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_DISTANCE;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) P;
  input[1] = (GeoElement) Q;
  setOnlyOutput(dist);
  setDependencies(); 
 }
 public GeoNumeric getDistance() {
  return dist;
 }
 public final void compute() {
  dist.setValue(P.distance(Q));
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlainDefault(
      "DistanceOfAandB", "Distance between %0 and %1", P.getLabel(tpl), Q.getLabel(tpl));
 }
 public PVariable[] getBotanaVars(GeoElementND geo) {
  return botanaVars;
 }
 public PPolynomial[] getBotanaPolynomials(GeoElementND geo) throws NoSymbolicParametersException {
  GeoPoint P1 = (GeoPoint) P;
  GeoPoint P2 = (GeoPoint) Q;
  if (P1 != null && P2 != null) {
   PVariable[] vP1 = P1.getBotanaVars(P1);
   PVariable[] vP2 = P2.getBotanaVars(P2);
   if (botanaVars == null) {
    botanaVars = new PVariable[4];
    botanaVars[0] = vP1[0];
    botanaVars[1] = vP1[1];
    botanaVars[2] = vP2[0];
    botanaVars[3] = vP2[1];
   }
   return null;
  }
  throw new NoSymbolicParametersException();
 }
}
```

### FILE: kernel/algos/AlgoIntersectCoordSysCurve.java
```java
public abstract class AlgoIntersectCoordSysCurve extends AlgoIntersectAbstract {
 protected GeoCurveCartesianND curve;
 private Solution soln;
 protected OutputHandler<GeoPointND> outputPoints; 
 public AlgoIntersectCoordSysCurve(Construction c) {
  super(c);
 }
 protected void findIntersections(ExpressionNode enx, FunctionVariable fv) {
  GeoFunction geoFun = enx.buildFunction(fv);
  double[] roots = null;
  int outputSize = -1;
  if (geoFun.isPolynomialFunction(true)) {
   if (soln == null) {
    soln = new Solution();
   }
   AlgoRootsPolynomial.calcRootsMultiple(
     geoFun.getFunction(), 0, soln, kernel.getEquationSolver());
   soln.sortAndMakeUnique();
   roots = soln.curRoots;
   outputSize = soln.curRealRoots;
  }
  if (roots == null || outputSize == 0) {
   roots = AlgoRoots.findRoots(
     geoFun.getFunction(), curve.getMinParameter(), curve.getMaxParameter(), 100);
   outputSize = roots == null || roots.length == 0 ? 1 : roots.length;
  }
  getOutputPoints().adjustOutputSize(outputSize);
  int index = 0;
  if (roots != null && roots.length > 0) {
   for (index = 0; index < outputSize; index++) {
    double paramVal = roots[index];
    GeoPointND point = getOutputPoints().getElement(index);
    if (paramVal < curve.getMinParameter() || paramVal > curve.getMaxParameter()) {
     point.setUndefined();
    } else {
     getCoordsBySubstitution(fv, paramVal, point, curve);
    }
   }
  }
  for (; index < getOutputPoints().size(); index++) {
   getOutputPoints().getElement(index).setUndefined();
  }
 }
 void getCoordsBySubstitution(
   FunctionVariable fv, double paramVal, GeoPointND point, GeoCurveCartesianND curve1) {
  ExpressionNode xFun = curve1.getFun(0).getExpression();
  ExpressionNode yFun = curve1.getFun(1).getExpression();
  double z = 0;
  fv.set(paramVal);
  if (curve1.getDimension() > 2) {
   z = curve1.getFun(2).getExpression().evaluateDouble();
  }
  point.setCoords(xFun.evaluateDouble(), yFun.evaluateDouble(), z, 1.0);
  if (!inCoordSys(point)) {
   point.setUndefined();
  }
 }
 protected final OutputHandler<GeoPointND> getOutputPoints() {
  return outputPoints;
 }
 protected final void updatePoint(GeoPointND point, double param, FunctionVariable fv) {
  ExpressionNode xFun = curve.getFun(0).getExpression();
  ExpressionNode yFun = curve.getFun(1).getExpression();
  double z = 0;
  fv.set(param);
  if (curve.getDimension() > 2) {
   z = curve.getFun(2).getExpression().evaluateDouble();
  }
  point.setCoords(xFun.evaluateDouble(), yFun.evaluateDouble(), z, 1.0);
 }
 protected boolean inCoordSys(GeoPointND point) {
  return true;
 }
 protected OutputHandler<GeoPointND> createOutputPoints(boolean is3d) {
  if (is3d) {
   return new OutputHandler<>(() -> {
    GeoPointND pt = kernel.getManager3D().point3D(0, 0, 0, false);
    pt.setParentAlgorithm(this);
    return pt;
   });
  } else {
   return new OutputHandler<>(() -> {
    GeoPoint p = new GeoPoint(cons);
    p.setCoords(0, 0, 1);
    p.setParentAlgorithm(this);
    return p;
   });
  }
 }
}
```

### FILE: kernel/algos/AlgoOrthoLinePointConic.java
```java
public class AlgoOrthoLinePointConic extends AlgoElement {
 private GeoPoint P; 
 private GeoConic l; 
 private GeoLine[] g; 
 private GeoNumeric[] n;
 private AlgoPointOnPath[] algoPoint;
 private AlgoClosestPoint closestPoint;
 public AlgoOrthoLinePointConic(Construction cons, String label, GeoPoint P, GeoConic l) {
  super(cons);
  this.P = P;
  this.l = l;
  g = new GeoLine[4];
  n = new GeoNumeric[4];
  algoPoint = new AlgoPointOnPath[4];
  closestPoint = new AlgoClosestPoint(cons, l, P);
  for (int i = 0; i < 4; i++) {
   g[i] = new GeoLine(cons);
   g[i].setStartPoint(P);
   n[i] = new GeoNumeric(cons);
   algoPoint[i] = new AlgoPointOnPath(cons, l, 0, 0, 0, n[i]);
   cons.removeFromConstructionList(algoPoint[i]);
  }
  setInputOutput(); 
  compute();
  for (int i = 0; i < 4; i++) {
   g[0].setLabel(label);
  }
  addIncidence();
 }
 public Commands getClassName() {
  return Commands.OrthogonalLine;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_ORTHOGONAL;
 }
 private void addIncidence() {
  P.addIncidence(g[0], false);
 }
 public void setInputOutput() {
  input = new GeoElement[2];
  input[0] = P;
  input[1] = l.toGeoElement();
  setOutputLength(4);
  for (int i = 0; i < 4; i++) {
   setOutput(i, g[i]);
  }
  setDependencies(); 
 }
 GeoConic getC() {
  return l;
 }
 GeoLine[] getLines() {
  return g;
 }
 GeoPoint getP() {
  return P;
 }
 public final void compute() {
  GeoVec3D.lineThroughPoints(P, (GeoPoint) closestPoint.getP(), g[0]);
 }
 public final String toString(StringTemplate tpl) {
  return getLoc()
    .getPlainDefault(
      "LineThroughAPerpendicularToB",
      "Line through %0 perpendicular to %1",
      P.getLabel(tpl),
      l.toGeoElement().getLabel(tpl));
 }
}
```

### FILE: kernel/algos/AlgoOrthoLinePointLine.java
```java
public class AlgoOrthoLinePointLine extends AlgoElement
  implements SymbolicParametersAlgo, SymbolicParametersBotanaAlgo {
 protected GeoPoint P; 
 protected Lineable2D l; 
 private final GeoLine g; 
 private PPolynomial[] polynomials;
 private OrthoLinePointLineAdapter proverAdapter;
 private final double[] normal = new double[3];
 public AlgoOrthoLinePointLine(Construction cons, String label, GeoPoint P, Lineable2D l) {
  super(cons);
  this.P = P;
  this.l = l;
  g = new GeoLine(cons);
  g.setStartPoint(P);
  setInputOutput(); 
  compute();
  g.setLabel(label);
  addIncidence();
 }
 private void addIncidence() {
  P.addIncidence(g, true);
 }
 public Commands getClassName() {
  return Commands.OrthogonalLine;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_ORTHOGONAL;
 }
 protected void setInput() {
  input = new GeoElement[2];
  input[0] = P;
  input[1] = l.toGeoElement();
 }
 public void setInputOutput() {
  setInput();
  setOnlyOutput(g);
  setDependencies(); 
 }
 public GeoLine getLine() {
  return g;
 }
 public GeoPoint getP() {
  return P;
 }
 public final void compute() {
  GeoVec3D.cross(P, l.getX(), l.getY(), 0.0, g);
  g.getNormalizedCoefficients(normal, 10E6, 1E-2);
  g.x = normal[0];
  g.y = normal[1];
  g.z = normal[2];
 }
 public SymbolicParameters getSymbolicParameters() {
  return new SymbolicParameters(this);
 }
 public void getFreeVariables(HashSet<PVariable> variables) throws NoSymbolicParametersException {
  if (P != null && l instanceof GeoLine) {
   P.getFreeVariables(variables);
   ((GeoLine) l).getFreeVariables(variables);
   return;
  }
  throw new NoSymbolicParametersException();
 }
 public int[] getDegrees(AbstractProverReciosMethod a) throws NoSymbolicParametersException {
  if (P != null && l instanceof GeoLine) {
   int[] degreeP = P.getDegrees(a);
   int[] degreeL = ((GeoLine) l).getDegrees(a);
   int[] result = new int[3];
   result[0] = degreeL[1] + degreeP[2];
   result[1] = degreeL[0] + degreeP[2];
   result[2] = Math.max(degreeL[0] + degreeP[1], degreeL[1] + degreeP[0]);
   return result;
  }
  throw new NoSymbolicParametersException();
 }
 public BigInteger[] getExactCoordinates(HashMap<PVariable, BigInteger> values)
   throws NoSymbolicParametersException {
  if (P != null && l instanceof GeoLine) {
   BigInteger[] pP = P.getExactCoordinates(values);
   BigInteger[] pL = ((GeoLine) l).getExactCoordinates(values);
   BigInteger[] coords = new BigInteger[3];
   coords[0] = pL[1].multiply(pP[2]).negate();
   coords[1] = pL[0].multiply(pP[2]);
   coords[2] = pL[0].multiply(pP[1]).negate().add(pL[1].multiply(pP[0]));
   return coords;
  }
  throw new NoSymbolicParametersException();
 }
 public PPolynomial[] getPolynomials() throws NoSymbolicParametersException {
  if (polynomials != null) {
   return polynomials;
  }
  if (P != null && l instanceof GeoLine) {
   PPolynomial[] pP = P.getPolynomials();
   PPolynomial[] pL = ((GeoLine) l).getPolynomials();
   polynomials = new PPolynomial[3];
   polynomials[0] = pL[1].multiply(pP[2]).negate();
   polynomials[1] = pL[0].multiply(pP[2]);
   polynomials[2] = pL[0].multiply(pP[1]).negate().add(pL[1].multiply(pP[0]));
   return polynomials;
  }
  throw new NoSymbolicParametersException();
 }
 public PVariable[] getBotanaVars(GeoElementND geo) {
  if (proverAdapter == null) {
   proverAdapter = new OrthoLinePointLineAdapter();
  }
  return proverAdapter.getBotanaVars();
 }
 public PPolynomial[] getBotanaPolynomials(GeoElementND geo) throws NoSymbolicParametersException {
  if (proverAdapter == null) {
   proverAdapter = new OrthoLinePointLineAdapter();
  }
  return proverAdapter.getBotanaPolynomials((GeoLine) l, P);
 }
 protected int getInputLengthForXML() {
  return getInputLengthForXMLMayNeedXOYPlane();
 }
 protected int getInputLengthForCommandDescription() {
  return getInputLengthForCommandDescriptionMayNeedXOYPlane();
 }
 public GeoElementND getInput(int i) {
  return getInputMaybeXOYPlane(i);
 }
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlainDefault(
      "LineThroughAPerpendicularToB",
      "Line through %0 perpendicular to %1",
      P.getLabel(tpl),
      ((GeoElement) l).getLabel(tpl));
 }
}
```

### FILE: kernel/algos/AlgoOrthoLinePointVector.java
```java
public class AlgoOrthoLinePointVector extends AlgoElement {
 private GeoPoint P; 
 private GeoVector v; 
 private GeoLine g; 
 public AlgoOrthoLinePointVector(Construction cons, String label, GeoPoint P, GeoVector v) {
  super(cons);
  this.P = P;
  this.v = v;
  g = new GeoLine(cons);
  g.setStartPoint(P);
  setInputOutput(); 
  compute();
  g.setLabel(label);
  addIncidence();
 }
 private void addIncidence() {
  P.addIncidence(g, true);
 }
 public Commands getClassName() {
  return Commands.OrthogonalLine;
 }
 public int getRelatedModeID() {
  return EuclidianConstants.MODE_ORTHOGONAL;
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = P;
  input[1] = v;
  setOnlyOutput(g);
  setDependencies(); 
 }
 public GeoLine getLine() {
  return g;
 }
 public final void compute() {
  GeoVec3D.cross(P, -v.y, v.x, 0.0, g);
 }
 protected int getInputLengthForXML() {
  return getInputLengthForXMLMayNeedXOYPlane();
 }
 protected int getInputLengthForCommandDescription() {
  return getInputLengthForCommandDescriptionMayNeedXOYPlane();
 }
 public GeoElementND getInput(int i) {
  return getInputMaybeXOYPlane(i);
 }
 public String toString(StringTemplate tpl) {
  return getLoc()
    .getPlainDefault(
      "LineThroughAPerpendicularToB",
      "Line through %0 perpendicular to %1",
      P.getLabel(tpl),
      v.getLabel(tpl));
 }
}
```

### FILE: kernel/algos/AlgoSphereNDPointRadius.java
```java
public abstract class AlgoSphereNDPointRadius extends AlgoElement {
 private GeoPointND M; 
 private GeoNumberValue r; 
 private GeoElement rgeo;
 private GeoQuadricND sphereND; 
 private int type;
 static final int TYPE_RADIUS = 0;
 static final int TYPE_SEGMENT = 1;
 public AlgoSphereNDPointRadius(Construction cons, GeoPointND M, GeoNumberValue r) {
  super(cons);
  type = TYPE_RADIUS;
  this.M = M;
  this.r = r;
  rgeo = r.toGeoElement();
  sphereND = createSphereND(cons);
  setInputOutput(); 
  compute();
  if (PreviewFeature.isAvailable(PreviewFeature.GEOMETRIC_DISCOVERY)) {
   if (r.getLabelSimple() != null || r.getParentAlgorithm() instanceof AlgoRadius) {
    autoColor();
   }
  }
  sphereND.setToSpecificForm();
 }
 private void autoColor() {
  if (r == null) {
   return;
  }
  String rl = r.getLabelSimple();
  if (rl == null) {
   if (!(r.getParentAlgorithm() instanceof AlgoRadius)) {
    return;
   }
   AlgoRadius ar = (AlgoRadius) r.getParentAlgorithm();
   GeoQuadricND c = ar.getQuadricOrConic();
   copyStyle(c);
   return;
  }
  TreeSet<GeoElement> geoSet = cons.getGeoSetConstructionOrder();
  Iterator<GeoElement> it = geoSet.iterator();
  while (it.hasNext()) {
   GeoElement geo = it.next();
   AlgoElement ae = geo.getParentAlgorithm();
   if (ae instanceof AlgoSphereNDPointRadius && !ae.equals(this)) {
    AlgoSphereNDPointRadius sphereND2 = (AlgoSphereNDPointRadius) ae;
    GeoNumberValue r2 = sphereND2.r;
    if (r2 != null) {
     String r2l = r2.getLabelSimple();
     if (r2l != null && r2l.equals(rl)) {
      copyStyle(geo);
      return;
     }
    }
   }
  }
  this.sphereND.setObjColor(
    this.sphereND.getAutoColorScheme().getNext(!cons.getKernel().isSilentMode()));
 }
 private void copyStyle(GeoElement from) {
  this.sphereND.setObjColor(from.getObjectColor());
  this.sphereND.setBackgroundColor(from.getBackgroundColor());
  this.sphereND.setDecorationType(from.getDecorationType());
  this.sphereND.setAlphaValue(from.getAlphaValue());
  this.sphereND.setLineOpacity(from.getLineOpacity());
  this.sphereND.setLineThickness(from.getLineThickness());
  this.sphereND.setLineType(from.getLineType());
 }
 protected AlgoSphereNDPointRadius(Construction cons, GeoPointND M, GeoSegmentND rgeo) {
  super(cons);
  type = TYPE_SEGMENT;
  this.M = M;
  this.rgeo = (GeoElement) rgeo;
  sphereND = createSphereND(cons);
  setInputOutput(); 
  compute();
  sphereND.setToSpecificForm();
 }
 protected abstract GeoQuadricND createSphereND(Construction cons1);
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) M;
  input[1] = rgeo;
  setOnlyOutput(sphereND);
  setDependencies(); 
 }
 public GeoQuadricND getSphereND() {
  return sphereND;
 }
 protected GeoPointND getM() {
  return M;
 }
 public GeoPointND getCenter() {
  return this.getM();
 }
 protected GeoElement getRGeo() {
  return rgeo;
 }
 public GeoElement getRadiusGeo() {
  return this.getRGeo();
 }
 public final void compute() {
  switch (type) {
   default:
   case TYPE_RADIUS:
    sphereND.setSphereND(M, r.getDouble());
    break;
   case TYPE_SEGMENT:
    sphereND.setSphereND(M, (GeoSegmentND) rgeo);
    break;
  }
 }
 protected int getType() {
  return this.type;
 }
 public void setRadius(GeoNumberValue newRadius) {
  if (type == TYPE_RADIUS) {
   this.r = newRadius;
   this.rgeo = newRadius.toGeoElement();
   this.input[1] = rgeo;
   update();
  }
 }
}
```

### FILE: kernel/algos/AlgoSphereNDTwoPoints.java
```java
public abstract class AlgoSphereNDTwoPoints extends AlgoElement {
 private GeoPointND M; 
 private GeoPointND P; 
 private GeoQuadricND sphereND; 
 public AlgoSphereNDTwoPoints(Construction cons, GeoPointND M, GeoPointND P) {
  super(cons);
  this.M = M;
  this.P = P;
  sphereND = createSphereND(cons);
  setInputOutput(); 
  compute();
  sphereND.setToSpecificForm();
 }
 protected abstract GeoQuadricND createSphereND(Construction cons1);
 protected AlgoSphereNDTwoPoints(Construction cons, String label, GeoPointND M, GeoPointND P) {
  this(cons, M, P);
  sphereND.setLabel(label);
 }
 protected void setInputOutput() {
  input = new GeoElement[2];
  input[0] = (GeoElement) M;
  input[1] = (GeoElement) P;
  setOnlyOutput(sphereND);
  setDependencies(); 
 }
 public GeoQuadricND getSphereND() {
  return sphereND;
 }
 public GeoPointND getCenter() {
  return this.getM();
 }
 protected GeoPointND getM() {
  return M;
 }
 public GeoPointND getExternalPoint() {
  return this.getP();
 }
 protected GeoPointND getP() {
  return P;
 }
 public final void compute() {
  sphereND.setSphereND(M, P);
 }
}
```

### FILE: kernel/cas/AlgoPlaneCoefficients.java
```java
public class AlgoPlaneCoefficients extends AlgoEquationCoefficients {
 public AlgoPlaneCoefficients(Construction cons, String label, GeoPlaneND plane) {
  super(cons, label, plane, 4);
 }
 public final void extractCoefficients() {
  Coords matrix = ((GeoPlaneND) eqn).getCoordSys().getEquationVector();
  for (int i = 0; i < 4; i++) {
   setCoeff(i, matrix.get(i + 1));
  }
 }
}
```

### FILE: kernel/geos/PolyhedronNetConverter.java
```java
public class PolyhedronNetConverter extends ExtrudeConverter {
 private double lengthDirection;
 public double translationToValue(
   Coords direction, Coords rwTransVec, double startValue, EuclidianView view) {
  return direction.dotproduct3(rwTransVec) / lengthDirection + startValue;
 }
 public void record(ChangeableParent parent, Coords startPoint) {
  lengthDirection = parent.getDirection().calcNorm();
 }
}
```

### FILE: kernel/kernelND/GeoCoordSys.java
```java
public interface GeoCoordSys extends GeoDirectionND {
 CoordSys getCoordSys();
}
```

### FILE: kernel/kernelND/GeoCoordSys1DInterface.java
```java
public interface GeoCoordSys1DInterface {
}
```

### FILE: kernel/kernelND/GeoCoordSys2D.java
```java
public interface GeoCoordSys2D extends GeoCoordSys, Region3D {
}
```

### FILE: kernel/kernelND/GeoPolygon3DInterface.java
```java
public interface GeoPolygon3DInterface {
}
```

### FILE: kernel/kernelND/GeoPolyhedronInterface.java
```java
public interface GeoPolyhedronInterface extends GeoElementND {
 void setPointSizeOrVisibility(int size);
 void pseudoCentroid(Coords coords);
}
```

### FILE: kernel/kernelND/GeoQuadric3DInterface.java
```java
public interface GeoQuadric3DInterface extends QuadraticEquationRepresentable {
 void setMatrixFromXML(double[] coeffs);
 void setEigenvectors(
   double x0,
   double y0,
   double z0,
   double x1,
   double y1,
   double z1,
   double x2,
   double y2,
   double z2);
 void ensureClassified();
 void hideIfNotSphere();
}
```

### FILE: kernel/kernelND/GeoQuadric3DLimitedInterface.java
```java
public interface GeoQuadric3DLimitedInterface extends GeoElementND {
}
```

### FILE: kernel/kernelND/GeoQuadric3DPartInterface.java
```java
public interface GeoQuadric3DPartInterface {
}
```

### FILE: kernel/kernelND/GeoQuadricND.java
```java
public abstract class GeoQuadricND extends GeoElement
  implements GeoQuadricNDConstants, QuadraticEquationRepresentable, Traceable {
 private int dimension;
 protected int matrixDim;
 public int type = GeoQuadricNDConstants.QUADRIC_NOT_CLASSIFIED;
 protected double[] matrix;
 private CoordMatrix symmetricMatrix;
 public double[] halfAxes;
 public double linearEccentricity;
 public double eccentricity;
 public double p;
 protected String parameter = "t";
 protected boolean defined = true;
 protected Coords midpoint;
 protected Coords[] eigenvecND;
 private static final char[] VAR_STRING = {'x', 'y', 'z'};
 protected double[] eigenval;
 protected double[] mu = new double[2];
 protected boolean isIntersection;
 private ChangeableParent changeableParent = null;
 private boolean trace;
 protected Form equationForm;
 public GeoQuadricND(Construction c, int dimension) {
  this(c, dimension, false);
 }
 public GeoQuadricND(Construction c) {
  super(c);
  equationForm = Form.IMPLICIT;
 }
 public GeoQuadricND(Construction c, int dimension, boolean isIntersection) {
  this(c);
  this.equationForm = Form.IMPLICIT;
  this.isIntersection = isIntersection;
  setConstructionDefaults(); 
  createFields(dimension);
 }
 protected void createFields(int dim) {
  this.dimension = dim;
  matrixDim = (dim + 1) * (dim + 2) / 2;
  matrix = new double[matrixDim];
  halfAxes = new double[dim];
  midpoint = new Coords(dim + 1);
  midpoint.set(dim + 1, 1);
  eigenval = new double[dim + 1];
  mu = new double[dim];
 }
 public double[] getFlatMatrix() {
  return matrix;
 }
 public void set(GeoElementND geo) {
  GeoQuadricND quadric = (GeoQuadricND) geo;
  if (quadric.hasChangeableParent3D()) {
   setChangeableParent(
     quadric.changeableParent.getNumber(),
     quadric.changeableParent.getDirector().toGeoElement(),
     quadric.changeableParent.getConverter(),
     quadric.changeableParent.getSurface());
  }
  reuseDefinition(geo);
 }
 public Coords getEigenvec3D(int i) {
  return eigenvecND[i];
 }
 protected CoordMatrix getSymmetricMatrix(double[] vals) {
  if (symmetricMatrix == null) {
   symmetricMatrix = new CoordMatrix(4, 4);
  }
  symmetricMatrix.set(1, 1, vals[0]);
  symmetricMatrix.set(2, 2, vals[1]);
  symmetricMatrix.set(3, 3, vals[2]);
  symmetricMatrix.set(4, 4, vals[3]);
  symmetricMatrix.set(1, 2, vals[4]);
  symmetricMatrix.set(2, 1, vals[4]);
  symmetricMatrix.set(1, 3, vals[5]);
  symmetricMatrix.set(3, 1, vals[5]);
  symmetricMatrix.set(2, 3, vals[6]);
  symmetricMatrix.set(3, 2, vals[6]);
  symmetricMatrix.set(1, 4, vals[7]);
  symmetricMatrix.set(4, 1, vals[7]);
  symmetricMatrix.set(2, 4, vals[8]);
  symmetricMatrix.set(4, 2, vals[8]);
  symmetricMatrix.set(3, 4, vals[9]);
  symmetricMatrix.set(4, 3, vals[9]);
  return symmetricMatrix;
 }
 public CoordMatrix getSymmetricMatrix() {
  return getSymmetricMatrix(matrix);
 }
 protected void setMatrix(CoordMatrix m) {
  matrix[0] = m.get(1, 1);
  matrix[1] = m.get(2, 2);
  matrix[2] = m.get(3, 3);
  matrix[3] = m.get(4, 4);
  matrix[4] = m.get(1, 2);
  matrix[5] = m.get(1, 3);
  matrix[6] = m.get(2, 3);
  matrix[7] = m.get(1, 4);
  matrix[8] = m.get(2, 4);
  matrix[9] = m.get(3, 4);
 }
 public abstract void setSphereND(GeoPointND M, GeoSegmentND segment);
 public void setSphereND(GeoPointND M, double r) {
  defined = M.isDefined() && !M.isInfinite(); 
  setSphereND(M.getInhomCoordsInD3(), r);
 }
 public void setSphereND(Coords M, double rad) {
  double r = rad;
  if (DoubleUtil.isZero(r)) {
   r = 0;
  } else if (r < 0) {
   defined = false;
  }
  if (defined) {
   setSphereNDMatrix(M, r);
   setAffineTransform();
  }
 }
 public abstract void setSphereND(GeoPointND M, GeoPointND P);
 protected void setSphereNDMatrix(Coords M, double r) {
  double[] coords = M.get();
  setMidpoint(coords);
  for (int i = 0; i < dimension; i++) {
   halfAxes[i] = r;
  }
  for (int i = 0; i < dimension; i++) {
   matrix[i] = 1.0d;
  }
  matrix[dimension] = -r * r;
  for (int i = 0; i < dimension; i++) {
   matrix[dimension] += coords[i] * coords[i];
  }
  for (int i = dimension + 1; i < matrixDim - dimension; i++) {
   matrix[i] = 0.0;
  }
  for (int i = matrixDim - dimension; i < matrixDim; i++) {
   matrix[i] = -coords[i - (matrixDim - dimension)];
  }
  if (r >= Kernel.STANDARD_PRECISION) { 
   if (type != QUADRIC_SPHERE) {
    type = QUADRIC_SPHERE;
    linearEccentricity = 0.0d;
    eccentricity = 0.0d;
    setFirstEigenvector(new double[] {1, 0});
    findEigenvectors();
   }
  } else if (DoubleUtil.isZero(r)) { 
   singlePoint();
  } else { 
   empty();
  }
 }
 public void empty() {
  type = QUADRIC_EMPTY;
 }
 public void setUndefined() {
  defined = false;
  empty();
  resetDefinition();
  if (matrix != null) {
   Arrays.fill(matrix, Double.NaN);
  }
 }
 public final void setDefined() {
  defined = true;
 }
 protected void setMidpoint(double coord1, double coord2) {
  midpoint.set(1, coord1);
  midpoint.set(2, coord2);
 }
 protected void setMidpoint(double[] coords) {
  midpoint.set(coords);
 }
 public Coords getMidpoint2D() {
  return midpoint;
 }
 public Coords getMidpoint() {
  return getMidpoint2D();
 }
 public Coords getMidpoint3D() {
  Coords ret = new Coords(4);
  for (int i = 1; i < midpoint.getLength(); i++) {
   ret.set(i, midpoint.get(i));
  }
  ret.setW(midpoint.getLast());
  return ret;
 }
 public double getHalfAxis(int i) {
  return halfAxes[i];
 }
 public boolean isDefined() {
  return defined;
 }
 public final int getType() {
  return type;
 }
 public final void setType(int type) {
  this.type = type;
 }
 public String toString(StringTemplate tpl) {
  StringBuilder sbToString = new StringBuilder();
  sbToString.setLength(0);
  sbToString.append(label);
  sbToString.append(tpl.getColonAssignment());
  sbToString.append(buildValueString(tpl).toString());
  return sbToString.toString();
 }
 public String toValueString(StringTemplate tpl) {
  return buildValueString(tpl).toString();
 }
 protected abstract StringBuilder buildValueString(StringTemplate tpl);
 protected void buildSphereNDString(StringBuilder sbToValueString, StringTemplate tpl) {
  String squared = tpl.squared();
  String rsquared = kernel.format(getHalfAxis(0) * getHalfAxis(0), tpl);
  for (int i = 0; i < dimension; i++) {
   if (DoubleUtil.isZero(getMidpoint().get(i + 1))) {
    sbToValueString.append(VAR_STRING[i]);
    sbToValueString.append(squared);
   } else {
    sbToValueString.append("(");
    sbToValueString.append(VAR_STRING[i]);
    sbToValueString.append(" ");
    kernel.formatSigned(-getMidpoint().get(i + 1), sbToValueString, tpl);
    sbToValueString.append(")");
    sbToValueString.append(squared);
   }
   if (i < dimension - 1) {
    sbToValueString.append(" + ");
   } else {
    sbToValueString.append(" = ");
   }
  }
  sbToValueString.append(rsquared);
 }
 protected void setFirstEigenvector(double[] coords) {
 }
 protected void findEigenvectors() {
 }
 protected abstract void singlePoint();
 protected void setAffineTransform() {
 }
 public final void setChangeableParent(
   GeoNumeric number,
   GeoElement direction,
   CoordConverter converter,
   GeoElementND solidQuadric) {
  changeableParent = new ChangeableParent(number, direction, converter, solidQuadric);
 }
 public boolean hasChangeableParent3D() {
  return changeableParent != null;
 }
 public ChangeableParent getChangeableParent3D() {
  return changeableParent;
 }
 public int getDimension() {
  return dimension;
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
 public final char getLabelDelimiter() {
  return ':';
 }
 public DescriptionMode getDescriptionMode() {
  if (equationForm == Form.USER
    && (isIndependent() || getParentAlgorithm().getClassName() == Algos.Expression)) {
   return DescriptionMode.VALUE;
  }
  return super.getDescriptionMode();
 }
 public boolean isParametricFormPossible() {
  return false;
 }
 public boolean isSpecificFormPossible() {
  return false;
 }
 public String getSpecificEquationLabel() {
  return null;
 }
 public String getSpecificEquationLabelKey() {
  return null;
 }
 public String getImplicitEquationLabelKey() {
  return "ImplicitConicEquation";
 }
 public boolean isExplicitFormPossible() {
  return false;
 }
 public boolean isVertexFormPossible() {
  return false;
 }
 public boolean isConicFormPossible() {
  return false;
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
  setEquationForm(Form.PARAMETRIC);
  if (parameter != null) {
   this.parameter = parameter;
  }
 }
 protected boolean hasEqualMatrix(GeoQuadricND conic) {
  double[] B = conic.matrix;
  double lambda1 = 0.0;
  boolean aZero, bZero, equal = true;
  for (int i = 0; i < 6; i++) {
   aZero = DoubleUtil.isZero(matrix[i]);
   bZero = DoubleUtil.isZero(B[i]);
   if (aZero && !bZero) {
    equal = false;
   } else if (bZero && !aZero) {
    equal = false;
   } else if (!aZero && !bZero) {
    if (lambda1 == 0.0) {
     lambda1 = matrix[i] / B[i];
    } else {
     equal = DoubleUtil.isEqual(matrix[i], lambda1 * B[i]);
    }
   }
   if (!equal) {
    break;
   }
  }
  return equal;
 }
 public boolean isLaTeXDrawableGeo() {
  return getEquationForm() == QuadraticEquationRepresentable.Form.USER && getDefinition() != null;
 }
 public void applyToStringModeFrom(GeoElement other) {
  if (other instanceof QuadraticEquationRepresentable) {
   equationForm = ((QuadraticEquationRepresentable) other).getEquationForm();
  }
 }
}
```

### FILE: kernel/kernelND/GeoQuadricNDConstants.java
```java
public interface GeoQuadricNDConstants {
 int QUADRIC_SINGLE_POINT = 1;
 int QUADRIC_INTERSECTING_LINES = 2;
 int QUADRIC_ELLIPSOID = 3;
 int QUADRIC_SPHERE = 4;
 int QUADRIC_HYPERBOLOID = 5;
 int QUADRIC_EMPTY = 6;
 int QUADRIC_DOUBLE_LINE = 7;
 int QUADRIC_PARALLEL_LINES = 8;
 int QUADRIC_PARABOLOID = 9;
 int QUADRIC_LINE = 10;
 int QUADRIC_CONE = 30;
 int QUADRIC_CYLINDER = 31;
 int QUADRIC_NOT_CLASSIFIED = 32;
 int QUADRIC_PLANE = 33;
 int QUADRIC_PARALLEL_PLANES = 34;
 int QUADRIC_INTERSECTING_PLANES = 35;
 int QUADRIC_HYPERBOLOID_ONE_SHEET = 36;
 int QUADRIC_HYPERBOLOID_TWO_SHEETS = 37;
 int QUADRIC_PARABOLIC_CYLINDER = 38;
 int QUADRIC_HYPERBOLIC_CYLINDER = 39;
 int QUADRIC_HYPERBOLIC_PARABOLOID = 40;
}
```

### FILE: kernel/matrix/AnimatableValue.java
```java
public interface AnimatableValue<T> {
 boolean equalsForAnimation(T other);
 boolean isDefined();
 void setAnimatableValue(T other);
 void setUndefined();
}
```

### FILE: kernel/matrix/CoordMatrix.java
```java
public class CoordMatrix {
 protected final Coords[] vectors;
 protected int rows;
 protected int columns;
 private CoordMatrix inverse;
 private PivotSolRes pivotSolRes;
 private PivotSolResDegenerate pivotSolResDegenerate;
 private PivotInverseMatrix pivotInverseMatrix;
 private double[][] pivotMatrix;
 public static final int X_AXIS = 1;
 public static final int Y_AXIS = 2;
 public static final int Z_AXIS = 3;
 public CoordMatrix(int rows, int columns, double[] val) {
  this.rows = rows;
  this.columns = columns;
  this.vectors = new Coords[columns];
  for (int j = 0; j < columns; j++) {
   vectors[j] = new Coords(rows);
   for (int i = 0; i < rows; i++) {
    vectors[j].set(i + 1, val[j * rows + i]);
   }
  }
 }
 public CoordMatrix(Coords... vectors) {
  this.vectors = vectors;
  this.rows = vectors[0].getLength();
  this.columns = vectors.length;
 }
 public CoordMatrix(int rows, int columns) {
  vectors = new Coords[columns];
  initialise(rows, columns);
 }
 private void initialise(int r, int c) {
  this.rows = r;
  this.columns = c;
  for (int i = 0; i < c; i++) {
   vectors[i] = new Coords(r);
  }
 }
 public static CoordMatrix identity(int n) {
  CoordMatrix m = new CoordMatrix(n, n);
  for (int i = 1; i <= n; i++) {
   m.set(i, i, 1.0);
  }
  return m;
 }
 public static CoordMatrix scaleMatrix(Coords v) {
  int n = v.getLength();
  CoordMatrix m = new CoordMatrix(n + 1, n + 1);
  for (int i = 1; i <= n; i++) {
   m.set(i, i, v.get(i));
  }
  m.set(n + 1, n + 1, 1.0);
  return m;
 }
 public static CoordMatrix diagonalMatrix(double[] vals) {
  int n = vals.length;
  CoordMatrix m = new CoordMatrix(n, n);
  for (int i = 1; i <= n; i++) {
   m.set(i, i, vals[i - 1]);
  }
  return m;
 }
 public static CoordMatrix translationMatrix(Coords v) {
  int n = v.getLength();
  CoordMatrix m = new CoordMatrix(n + 1, n + 1);
  for (int i = 1; i <= n; i++) {
   m.set(i, i, 1.0);
   m.set(i, n + 1, v.get(i));
  }
  m.set(n + 1, n + 1, 1.0);
  return m;
 }
 public static CoordMatrix rotation3DMatrix(int axe, double angle) {
  CoordMatrix m = new CoordMatrix(4, 4);
  setRotation3DMatrix(axe, angle, m);
  return m;
 }
 public static void setRotation3DMatrix(int axe, double angle, CoordMatrix m) {
  m.set(0);
  switch (axe) {
   case Z_AXIS:
    m.set(1, 1, Math.cos(angle));
    m.set(1, 2, -Math.sin(angle));
    m.set(2, 1, Math.sin(angle));
    m.set(2, 2, Math.cos(angle));
    m.set(3, 3, 1.0);
    break;
   case X_AXIS:
    m.set(1, 1, 1.0);
    m.set(2, 2, Math.cos(angle));
    m.set(2, 3, -Math.sin(angle));
    m.set(3, 2, Math.sin(angle));
    m.set(3, 3, Math.cos(angle));
    break;
   case Y_AXIS:
    m.set(2, 2, 1.0);
    m.set(3, 3, Math.cos(angle));
    m.set(3, 1, -Math.sin(angle));
    m.set(1, 3, Math.sin(angle));
    m.set(1, 1, Math.cos(angle));
    break;
   default:
    break;
  }
  m.set(4, 4, 1.0);
 }
 public static void rotation3x3(double angle, CoordMatrix m) {
  double cos = Math.cos(angle);
  double sin = Math.sin(angle);
  m.set(1, 1, cos);
  m.set(1, 2, -sin);
  m.set(2, 1, sin);
  m.set(2, 2, cos);
  m.set(3, 3, 1);
 }
 public static void rotation3x3(Coords u, double angle, CoordMatrix m) {
  double ux = u.getX();
  double uy = u.getY();
  double uz = u.getZ();
  double c = Math.cos(angle);
  double s = Math.sin(angle);
  Coords[] vectors = m.vectors;
  vectors[0].setX(ux * ux * (1 - c) + c);
  vectors[0].setY(ux * uy * (1 - c) + uz * s);
  vectors[0].setZ(ux * uz * (1 - c) - uy * s);
  vectors[1].setX(ux * uy * (1 - c) - uz * s);
  vectors[1].setY(uy * uy * (1 - c) + c);
  vectors[1].setZ(uy * uz * (1 - c) + ux * s);
  vectors[2].setX(ux * uz * (1 - c) + uy * s);
  vectors[2].setY(uy * uz * (1 - c) - ux * s);
  vectors[2].setZ(uz * uz * (1 - c) + c);
 }
 public void get(double[] val) {
  for (int i = 0; i < rows; i++) {
   for (int j = 0; j < columns; j++) {
    val[i + j * rows] = get(i + 1, j + 1);
   }
  }
 }
 public double get(int i, int j) {
  return vectors[j - 1].get(i);
 }
 public CoordMatrix subMatrix(int i, int j) {
  CoordMatrix ret = new CoordMatrix(getRows() - 1, getColumns() - 1);
  for (int i1 = 1; i1 < i; i1++) {
   for (int j1 = 1; j1 < j; j1++) {
    ret.set(i1, j1, get(i1, j1));
   }
   for (int j1 = j + 1; j1 <= getColumns(); j1++) {
    ret.set(i1, j1 - 1, get(i1, j1));
   }
  }
  for (int i1 = i + 1; i1 <= getRows(); i1++) {
   for (int j1 = 1; j1 < j; j1++) {
    ret.set(i1 - 1, j1, get(i1, j1));
   }
   for (int j1 = j + 1; j1 <= getColumns(); j1++) {
    ret.set(i1 - 1, j1 - 1, get(i1, j1));
   }
  }
  return ret;
 }
 public Coords getColumn(int j) {
  return vectors[j - 1];
 }
 public void set(Coords V, int j) {
  for (int i = 1; i <= V.getLength(); i++) {
   set(i, j, V.get(i));
  }
 }
 public void set(Coords[] V) {
  int j;
  for (j = 0; j < V.length; j++) {
   set(V[j], j + 1);
  }
 }
 public void set(int i, int j, double val0) {
  vectors[j - 1].set(i, val0);
 }
 public void set(double val0) {
  for (int i = 0; i < columns; i++) {
   vectors[i].set(val0);
  }
 }
 public void set(CoordMatrix m) {
  for (int i = 1; i <= m.getRows(); i++) {
   for (int j = 1; j <= m.getColumns(); j++) {
    this.set(i, j, m.get(i, j));
   }
  }
 }
 public void setTranspose(CoordMatrix m) {
  for (int i = 1; i <= m.getRows(); i++) {
   for (int j = 1; j <= m.getColumns(); j++) {
    this.set(i, j, m.get(j, i));
   }
  }
 }
 public int getRows() {
  return rows;
 }
 public int getColumns() {
  return columns;
 }
 public CoordMatrix copy() {
  CoordMatrix result = new CoordMatrix(getRows(), getColumns());
  for (int i = 1; i <= result.getRows(); i++) {
   for (int j = 1; j <= result.getColumns(); j++) {
    result.set(i, j, get(i, j));
   }
  }
  return result;
 }
 public void copy(CoordMatrix result) {
  for (int i = 1; i <= result.getRows(); i++) {
   for (int j = 1; j <= result.getColumns(); j++) {
    result.set(i, j, get(i, j));
   }
  }
 }
 public CoordMatrix transposeCopy() {
  CoordMatrix result = new CoordMatrix(columns, rows);
  transposeCopy(result);
  return result;
 }
 public void transposeCopy(CoordMatrix result) {
  for (int i = 1; i <= result.getRows(); i++) {
   for (int j = 1; j <= result.getColumns(); j++) {
    result.set(i, j, get(j, i));
   }
  }
 }
 public String toString() {
  StringBuilder s = new StringBuilder();
  for (int i = 1; i <= getRows(); i++) {
   for (int j = 1; j <= getColumns(); j++) {
    double v = get(i, j);
    if (DoubleUtil.isZero(v)) {
     v = 0;
    }
    s.append("  ");
    s.append(v);
   }
   s.append('\n');
  }
  return s.toString();
 }
 public String toString(int digits, int precision) {
  StringBuilder s = new StringBuilder();
  for (int i = 1; i <= getRows(); i++) {
   for (int j = 1; j <= getColumns(); j++) {
    s.append("  ");
    StringUtil.toString(get(i, j), digits, precision, s);
   }
   s.append('\n');
  }
  return s.toString();
 }
 public boolean isDefined() {
  for (int i = 0; i < columns; i++) {
   if (!vectors[i].isDefined()) {
    return false;
   }
  }
  return true;
 }
 public boolean isFinite() {
  for (int i = 0; i < columns; i++) {
   if (!vectors[i].isFinite()) {
    return false;
   }
  }
  return true;
 }
 public CoordMatrix mul(double val0) {
  CoordMatrix result = new CoordMatrix(getRows(), getColumns());
  for (int i = 1; i <= result.getRows(); i++) {
   for (int j = 1; j <= result.getColumns(); j++) {
    result.set(i, j, val0 * get(i, j));
   }
  }
  return result;
 }
 public void mulInside(double v) {
  for (int i = 0; i < columns; i++) {
   vectors[i].mulInside(v);
  }
 }
 public CoordMatrix add(CoordMatrix m) {
  CoordMatrix result = new CoordMatrix(getRows(), getColumns());
  for (int i = 1; i <= result.getRows(); i++) {
   for (int j = 1; j <= result.getColumns(); j++) {
    result.set(i, j, get(i, j) + m.get(i, j));
   }
  }
  return result;
 }
 public CoordMatrix addSmaller(CoordMatrix m) {
  CoordMatrix result = new CoordMatrix(getRows(), getColumns());
  for (int i = 1; i <= m.getRows(); i++) {
   for (int j = 1; j <= m.getColumns(); j++) {
    result.set(i, j, get(i, j) + m.get(i, j));
   }
  }
  return result;
 }
 public Coords mul(Coords v) {
  Coords result = new Coords(getRows());
  return result.setMul(this, v);
 }
 public CoordMatrix mul(CoordMatrix m) {
  CoordMatrix result = new CoordMatrix(getRows(), m.getColumns());
  this.mul(m, result);
  return result;
 }
 public void mul(CoordMatrix m, CoordMatrix result) {
  for (int i = 1; i <= result.getRows(); i++) {
   for (int j = 1; j <= result.getColumns(); j++) {
    double r = 0;
    for (int n = 1; n <= getColumns(); n++) {
     r += get(i, n) * m.get(n, j);
    }
    result.set(i, j, r);
   }
  }
 }
 public CoordMatrix setMul(CoordMatrix m1, CoordMatrix m2) {
  for (int i = 1; i <= getRows(); i++) {
   for (int j = 1; j <= getColumns(); j++) {
    double r = 0;
    for (int n = 1; n <= m1.getColumns(); n++) {
     r += m1.get(i, n) * m2.get(n, j);
    }
    set(i, j, r);
   }
  }
  return this;
 }
 public CoordMatrix setMul3x3(CoordMatrix m1, CoordMatrix m2) {
  for (int i = 1; i <= 3; i++) {
   for (int j = 1; j <= 3; j++) {
    double r = 0;
    for (int n = 1; n <= 3; n++) {
     r += m1.get(i, n) * m2.get(n, j);
    }
    set(i, j, r);
   }
  }
  return this;
 }
 public CoordMatrix setMulT1(CoordMatrix m1, CoordMatrix m2) {
  for (int i = 1; i <= getRows(); i++) {
   for (int j = 1; j <= getColumns(); j++) {
    double r = 0;
    for (int n = 1; n <= m1.getRows(); n++) {
     r += m1.get(n, i) * m2.get(n, j);
    }
    set(i, j, r);
   }
  }
  return this;
 }
 protected CoordMatrix4x4 mul3x3(CoordMatrix m) {
  CoordMatrix4x4 result = new CoordMatrix4x4();
  for (int i = 1; i <= 3; i++) {
   for (int j = 1; j <= 3; j++) {
    double r = 0;
    for (int n = 1; n <= 3; n++) {
     r += get(i, n) * m.get(n, j);
    }
    result.set(i, j, r);
   }
  }
  return result;
 }
 public double det() {
  double ret = 0.0;
  if (getRows() == 1) {
   ret = get(1, 1);
  } else {
   double signe = 1.0;
   for (int j = 1; j <= getColumns(); j++) {
    ret += get(1, j) * signe * subMatrix(1, j).det();
    signe = -signe;
   }
  }
  return ret;
 }
 public CoordMatrix inverse() {
  if (inverse == null) {
   inverse = new CoordMatrix(getRows(), getColumns());
  }
  if (pivotInverseMatrix == null) {
   pivotInverseMatrix = new PivotInverseMatrix();
   pivotInverseMatrix.matrixRes = new double[columns * columns];
   for (int c = 0; c < columns; c++) {
    pivotInverseMatrix.matrixRes[c * rows + c] = 1;
   }
   pivotInverseMatrix.inverse = inverse.vectors;
   pivotInverseMatrix.columns = columns;
  } else {
   for (int c = 0; c < columns; c++) {
    for (int r = 0; r < rows; r++) {
     pivotInverseMatrix.matrixRes[c * rows + r] = 0;
    }
    pivotInverseMatrix.matrixRes[c * rows + c] = 1;
   }
  }
  updatePivotMatrix();
  pivot(pivotMatrix, pivotInverseMatrix);
  return inverse;
 }
 public Coords solve(Coords v) {
  Coords sol = new Coords(v.getLength());
  pivot(sol, v);
  return sol;
 }
 public Coords solve(Coords v, Coords sol) {
  pivot(sol, v);
  return sol;
 }
 public static synchronized void solve(
   double[][] matrixForSolve, double[] sol, Coords res, Coords... columns) {
  int size = res.getLength();
  for (int i = 0; i < size; i++) {
   columns[i].copy(matrixForSolve[i]);
  }
  PivotSolRes pivotSolRes = new PivotSolRes();
  pivotSolRes.res = new double[size];
  res.copy(pivotSolRes.res);
  pivotSolRes.sol = sol;
  pivot(matrixForSolve, pivotSolRes);
 }
 public void flattenTo(double[] matrix) {
  matrix[0] = this.get(1, 1);
  matrix[1] = this.get(2, 2);
  matrix[2] = this.get(3, 3);
  matrix[3] = (this.get(1, 2) + this.get(2, 1)) / 2.0;
  matrix[4] = (this.get(1, 3) + this.get(3, 1)) / 2.0;
  matrix[5] = (this.get(2, 3) + this.get(3, 2)) / 2.0;
 }
 private abstract static class PivotAbstract {
  protected PivotAbstract() {
  }
  abstract void divideFirst(int index, double factor);
  void lastStep(ArrayList<Integer> stack, double[][] matrix) {
   int index = stack.get(0);
   divideFirst(index, matrix[index][0]);
  }
  abstract void divideRes(int step, double value);
  abstract void subRes(int l, int step, double coef);
  abstract void calcSol(
    int index, int step, double[][] matrix, ArrayList<Integer> stack, double value);
  void divideAndSub(
    double[][] matrix, ArrayList<Integer> stack, int step, int index, double value) {
   for (int i : stack) {
    matrix[i][step] /= value;
   }
   divideRes(step, value);
   for (int l = 0; l < step; l++) {
    double coef = matrix[index][l];
    for (int i : stack) {
     matrix[i][l] -= coef * matrix[i][step];
    }
    subRes(l, step, coef);
   }
  }
  boolean handleZeroValue(double value, int step) {
   return false;
  }
 }
 private static class PivotSolResDegenerate extends PivotSolRes {
  private boolean[] nonZeroIndices;
  protected PivotSolResDegenerate() {}
  void divideAndSub(
    double[][] matrix, ArrayList<Integer> stack, int step, int index, double value) {
   if (DoubleUtil.isZero(value)) {
    return;
   }
   super.divideAndSub(matrix, stack, step, index, value);
  }
  private void divideFirst0(int index) {
   if (DoubleUtil.isZero(res[0])) {
    sol[index] = 1; 
   } else {
    sol[index] = Double.NaN; 
   }
  }
  void lastStep(ArrayList<Integer> stack, double[][] matrix) {
   int index0 = 0;
   for (int index : stack) {
    double factor = matrix[index][0];
    if (!DoubleUtil.isZero(factor)) {
     divideFirst(index, factor);
     nonZeroIndices[index] = true;
     manageZeroSteps(); 
     return;
    }
    index0 = index;
   }
   divideFirst0(index0);
   manageZeroSteps(); 
  }
  void calcSol(int index, int step, double[][] matrix, ArrayList<Integer> stack, double value) {
   double s = res[step]; 
   if (DoubleUtil.isZero(value)) {
    if (DoubleUtil.isZero(s)) {
     s = 1; 
    } else {
     s = Double.NaN; 
    }
   } else {
    nonZeroIndices[index] = true;
   }
   for (int i : stack) {
    s -= matrix[i][step] * sol[i]; 
   }
   sol[index] = s;
  }
  boolean handleZeroValue(double value, int step) {
   return DoubleUtil.isZero(value);
  }
  private void init(int length) {
   nonZeroIndices = new boolean[length];
  }
  private void manageZeroSteps() {
   for (int i = 0; i < nonZeroIndices.length; i++) {
    if (!nonZeroIndices[i]) {
     if (DoubleUtil.isZero(res[i])) {
      sol[i] = 1; 
     } else {
      sol[i] = Double.NaN; 
     }
    }
   }
  }
 }
 private static class PivotSolRes extends PivotAbstract {
  double[] sol;
  double[] res;
  protected PivotSolRes() {
   super();
  }
  void divideFirst(int index, double factor) {
   sol[index] = res[0] / factor;
  }
  void divideRes(int step, double value) {
   res[step] /= value;
  }
  void subRes(int l, int step, double coef) {
   res[l] -= coef * res[step];
  }
  void calcSol(int index, int step, double[][] matrix, ArrayList<Integer> stack, double value) {
   double s = res[step]; 
   for (int i : stack) {
    s -= matrix[i][step] * sol[i]; 
   }
   sol[index] = s;
  }
 }
 private static final class PivotInverseMatrix extends PivotAbstract {
  private int columns;
  private double[] matrixRes;
  private Coords[] inverse;
  void divideFirst(int index, double factor) {
   for (int i = 0; i < columns; i++) {
    inverse[i].set(index + 1, matrixRes[i * columns] / factor);
   }
  }
  void divideRes(int step, double value) {
   for (int i = 0; i < columns; i++) {
    matrixRes[step + i * columns] /= value;
   }
  }
  void subRes(int l, int step, double coef) {
   for (int i = 0; i < columns; i++) {
    matrixRes[l + i * columns] -= coef * matrixRes[step + i * columns];
   }
  }
  void calcSol(int index, int step, double[][] matrix, ArrayList<Integer> stack, double value) {
   for (int j = 0; j < columns; j++) {
    double s = matrixRes[step + j * columns]; 
    for (int i : stack) {
     s -= matrix[i][step] * inverse[j].get(i + 1); 
    }
    inverse[j].set(index + 1, s);
   }
  }
 }
 private void updatePivotMatrix() {
  if (pivotMatrix == null) {
   pivotMatrix = new double[columns][];
  }
  for (int c = 0; c < columns; c++) {
   pivotMatrix[c] = new double[rows];
   for (int r = 0; r < rows; r++) {
    pivotMatrix[c][r] = get(r + 1, c + 1);
   }
  }
 }
 public void pivot(Coords sol, Coords res) {
  updatePivotMatrix();
  if (pivotSolRes == null) {
   pivotSolRes = new PivotSolRes();
  }
  pivotSolRes.res = new double[res.getLength()];
  for (int r = 0; r < rows; r++) {
   pivotSolRes.res[r] = res.val[r];
  }
  pivotSolRes.sol = sol.val;
  pivot(pivotMatrix, pivotSolRes);
 }
 public void pivotDegenerate(Coords sol, Coords res) {
  updatePivotMatrix();
  if (pivotSolResDegenerate == null) {
   pivotSolResDegenerate = new PivotSolResDegenerate();
  }
  pivotSolResDegenerate.init(pivotMatrix.length);
  pivotSolResDegenerate.res = new double[res.getLength()];
  for (int r = 0; r < rows; r++) {
   pivotSolResDegenerate.res[r] = res.val[r];
  }
  pivotSolResDegenerate.sol = sol.val;
  pivot(pivotMatrix, pivotSolResDegenerate);
 }
 static void pivot(double[][] matrix, PivotAbstract psr) {
  int size = matrix.length;
  ArrayList<Integer> stack = new ArrayList<>();
  for (int i = size - 1; i >= 0; i--) {
   stack.add(i);
  }
  pivot(matrix, psr, size - 1, stack);
 }
 private static void pivot(
   double[][] matrix, PivotAbstract psr, final int step, ArrayList<Integer> stack) {
  if (step == 0) {
   psr.lastStep(stack, matrix);
  } else {
   int stackIndex = 0;
   int index = stack.get(0);
   double value = matrix[index][step];
   for (int currentStackIndex = 1; currentStackIndex < stack.size(); currentStackIndex++) {
    int currentIndex = stack.get(currentStackIndex);
    double currentValue = matrix[currentIndex][step];
    if (Math.abs(currentValue) > Math.abs(value)) {
     stackIndex = currentStackIndex;
     index = currentIndex;
     value = currentValue;
    }
   }
   if (psr.handleZeroValue(value, step)) {
    pivot(matrix, psr, step - 1, stack);
   } else {
    psr.divideAndSub(matrix, stack, step, index, value);
    stack.remove(stackIndex);
    pivot(matrix, psr, step - 1, stack);
    psr.calcSol(index, step, matrix, stack, value);
    stack.add(index);
   }
  }
 }
 public Coords getOrigin() {
  return getColumn(getColumns());
 }
 public Coords getVx() {
  return getColumn(1);
 }
 public Coords getVy() {
  return getColumn(2);
 }
 public Coords getVz() {
  return getColumn(3);
 }
 public void setOrigin(Coords v) {
  set(v, getColumns());
 }
 public void addToOrigin(Coords v) {
  addToColumn(v, getColumns());
 }
 public void subToOrigin(Coords v) {
  subToColumn(v, getColumns());
 }
 public void addToVx(Coords v) {
  addToColumn(v, 1);
 }
 public void addToVy(Coords v) {
  addToColumn(v, 2);
 }
 public void addToVz(Coords v) {
  addToColumn(v, 3);
 }
 public void addToColumn(Coords v, int j) {
  for (int i = 1; i <= v.getLength(); i++) {
   set(i, j, get(i, j) + v.get(i));
  }
 }
 public void subToColumn(Coords v, int j) {
  for (int i = 1; i <= v.getLength(); i++) {
   set(i, j, get(i, j) - v.get(i));
  }
 }
 public void mulColumn(double v, int j) {
  for (int i = 1; i <= getRows(); i++) {
   set(i, j, get(i, j) * v);
  }
 }
 public void mulOrigin(double v) {
  mulColumn(v, getColumns());
 }
 public void setVx(Coords v) {
  set(v, 1);
 }
 public void setVy(Coords v) {
  set(v, 2);
 }
 public void setVz(Coords v) {
  set(v, 3);
 }
 public void getForGL(float[] val) {
  int index = 0;
  for (int x = 0; x < columns; x++) {
   for (int y = 0; y < rows; y++) {
    val[index] = (float) get(y + 1, x + 1);
    index++;
   }
  }
 }
 public void setFromGL(float[] val) {
  int index = 0;
  for (int x = 0; x < columns; x++) {
   for (int y = 0; y < rows; y++) {
    set(y + 1, x + 1, val[index]);
    index++;
   }
  }
 }
 public void subToDiagonal(double value) {
  for (int i = 0; i < rows; i++) {
   vectors[i].val[i] -= value;
  }
 }
 public void setDiagonal3(double v) {
  vectors[0].val[0] = v;
  vectors[0].val[1] = 0;
  vectors[0].val[2] = 0;
  vectors[1].val[0] = 0;
  vectors[1].val[1] = v;
  vectors[1].val[2] = 0;
  vectors[2].val[0] = 0;
  vectors[2].val[1] = 0;
  vectors[2].val[2] = v;
 }
 public static void test() {
  CoordMatrix matrix = new CoordMatrix4x4();
  matrix.setVx(new Coords(1, 1, -1, 0));
  matrix.setVy(new Coords(-1, 1, -1, 0));
  matrix.setVz(new Coords(1, 2, 5, 0));
  matrix.setOrigin(new Coords(4, 5, 6, 1));
  Log.debug("==== MATRIX ====\n" + matrix.toString());
  Log.debug("==== INVERSE ====\n" + matrix.inverse().toString());
  matrix.pivotInverseMatrix = new PivotInverseMatrix();
  matrix.pivotInverseMatrix.matrixRes = new double[4 * 4];
  for (int c = 0; c < 4; c++) {
   matrix.pivotInverseMatrix.matrixRes[c * 4 + c] = 1;
  }
  matrix.pivotInverseMatrix.inverse = matrix.inverse.vectors;
  matrix.pivotInverseMatrix.columns = matrix.getColumns();
  double[][] matrixD = new double[matrix.columns][];
  for (int c = 0; c < matrix.columns; c++) {
   matrixD[c] = new double[matrix.rows];
   for (int r = 0; r < matrix.rows; r++) {
    matrixD[c][r] = matrix.get(r + 1, c + 1);
   }
  }
  pivot(matrixD, matrix.pivotInverseMatrix);
  Log.debug("==== PIVOT INVERSE ====\n" + matrix.inverse.toString());
  Log.debug("==== MATRIX * INVERSE ====\n" + matrix.mul(matrix.inverse).toString());
 }
}
```

### FILE: kernel/matrix/CoordMatrix4x4.java
```java
public class CoordMatrix4x4 extends CoordMatrix {
 public static final int VX = 0;
 public static final int VY = 1;
 public static final int VZ = 2;
 public static final CoordMatrix4x4 IDENTITY = identity();
 public static final CoordMatrix4x4 MIRROR_O = identity().mirrorO();
 public static final CoordMatrix4x4 MIRROR_X = identity().mirrorX();
 public static final CoordMatrix4x4 MIRROR_Y = identity().mirrorY();
 public static final CoordMatrix4x4 ROTATION_OZ_90 = rotationOz(Math.PI / 2);
 public static final CoordMatrix4x4 ROTATION_OZ_M90 = rotationOz(-Math.PI / 2);
 public CoordMatrix4x4() {
  super(4, 4);
 }
 public CoordMatrix4x4(double[] vals) {
  super(4, 4, vals);
 }
 public CoordMatrix4x4(
   double a00,
   double a01,
   double a02,
   double a10,
   double a11,
   double a12,
   double a20,
   double a21,
   double a22) {
  this();
  vectors[0].setX(a00);
  vectors[0].setY(a10);
  vectors[0].setZ(a20);
  vectors[0].setW(0);
  vectors[1].setX(a01);
  vectors[1].setY(a11);
  vectors[1].setZ(a21);
  vectors[1].setW(0);
  vectors[2].setX(a02);
  vectors[2].setY(a12);
  vectors[2].setZ(a22);
  vectors[2].setW(0);
  vectors[3].setX(0);
  vectors[3].setY(0);
  vectors[3].setZ(0);
  vectors[3].setW(1);
 }
 public static CoordMatrix4x4 identity() {
  CoordMatrix4x4 ret = new CoordMatrix4x4();
  for (int i = 1; i <= 4; i++) {
   ret.set(i, i, 1.0);
  }
  return ret;
 }
 public static void identity(CoordMatrix4x4 ret) {
  for (int i = 0; i < 4; i++) {
   ret.vectors[i].set(0.0);
   ret.vectors[i].set(i + 1, 1.0);
  }
 }
 public static CoordMatrix4x4 dilate(double f) {
  CoordMatrix4x4 ret = new CoordMatrix4x4();
  for (int i = 1; i <= 3; i++) {
   ret.set(i, i, f);
  }
  ret.set(4, 4, 1);
  return ret;
 }
 public static void setDilate(CoordMatrix m, double f) {
  for (int i = 1; i <= 3; i++) {
   m.set(i, i, f);
  }
  m.set(4, 4, 1);
 }
 public static void setZero(CoordMatrix m) {
  for (int i = 1; i <= 4; i++) {
   for (int j = 1; j <= 4; j++) {
    m.set(i, j, 0);
   }
  }
 }
 public static CoordMatrix4x4 rotationOz(double angle) {
  CoordMatrix4x4 ret = new CoordMatrix4x4();
  double c = Math.cos(angle);
  double s = Math.sin(angle);
  ret.set(1, 1, c);
  ret.set(2, 2, c);
  ret.set(2, 1, s);
  ret.set(1, 2, -s);
  ret.set(3, 3, 1);
  ret.set(4, 4, 1);
  return ret;
 }
 public static void rotation4x4(double angle, CoordMatrix4x4 m) {
  double cos = Math.cos(angle);
  double sin = Math.sin(angle);
  m.set(1, 1, cos);
  m.set(1, 2, -sin);
  m.set(1, 3, 0);
  m.set(2, 1, sin);
  m.set(2, 2, cos);
  m.set(2, 3, 0);
  m.set(3, 1, 0);
  m.set(3, 2, 0);
  m.set(3, 3, 1);
  m.set(4, 1, 0);
  m.set(4, 2, 0);
  m.set(4, 3, 0);
  m.set(4, 4, 1);
 }
 public static void rotation4x4(double angle, Coords center, CoordMatrix4x4 m) {
  double cos = Math.cos(angle);
  double sin = Math.sin(angle);
  m.set(1, 1, cos);
  m.set(1, 2, -sin);
  m.set(1, 3, 0);
  m.set(2, 1, sin);
  m.set(2, 2, cos);
  m.set(2, 3, 0);
  m.set(3, 1, 0);
  m.set(3, 2, 0);
  m.set(3, 3, 1);
  m.set(4, 1, 0);
  m.set(4, 2, 0);
  m.set(4, 3, 0);
  m.set(4, 4, 0);
  m.setOrigin(center.sub(m.mul(center)));
 }
 public static void rotation4x4(Coords u, double angle, Coords center, CoordMatrix4x4 m) {
  double ux = u.getX();
  double uy = u.getY();
  double uz = u.getZ();
  double c = Math.cos(angle);
  double s = Math.sin(angle);
  Coords[] vec = m.vectors;
  vec[0].setX(ux * ux * (1 - c) + c);
  vec[0].setY(ux * uy * (1 - c) + uz * s);
  vec[0].setZ(ux * uz * (1 - c) - uy * s);
  vec[1].setX(ux * uy * (1 - c) - uz * s);
  vec[1].setY(uy * uy * (1 - c) + c);
  vec[1].setZ(uy * uz * (1 - c) + ux * s);
  vec[2].setX(ux * uz * (1 - c) + uy * s);
  vec[2].setY(uy * uz * (1 - c) - ux * s);
  vec[2].setZ(uz * uz * (1 - c) + c);
  vec[3].set(0.0);
  m.setOrigin(center.sub(m.mul(center)));
 }
 public static CoordMatrix4x4 axialSymmetry(Coords u, Coords center) {
  double ux = u.getX();
  double uy = u.getY();
  double uz = u.getZ();
  double[] vals = new double[16];
  vals[0] = 2 * ux * ux - 1;
  vals[1] = 2 * ux * uy;
  vals[2] = 2 * ux * uz;
  vals[4] = 2 * ux * uy;
  vals[5] = 2 * uy * uy - 1;
  vals[6] = 2 * uy * uz;
  vals[8] = 2 * ux * uz;
  vals[9] = 2 * uy * uz;
  vals[10] = 2 * uz * uz - 1;
  CoordMatrix4x4 m = new CoordMatrix4x4(vals);
  m.setOrigin(center.sub(m.mul(center)));
  return m;
 }
 public static CoordMatrix4x4 planeSymmetry(Coords n, Coords center) {
  double nx = n.getX();
  double ny = n.getY();
  double nz = n.getZ();
  double[] vals = new double[16];
  vals[0] = 1 - 2 * nx * nx;
  vals[1] = -2 * nx * ny;
  vals[2] = -2 * nx * nz;
  vals[4] = -2 * nx * ny;
  vals[5] = 1 - 2 * ny * ny;
  vals[6] = -2 * ny * nz;
  vals[8] = -2 * nx * nz;
  vals[9] = -2 * ny * nz;
  vals[10] = 1 - 2 * nz * nz;
  CoordMatrix4x4 m = new CoordMatrix4x4(vals);
  m.setOrigin(n.mul(2 * center.dotproduct(n)));
  m.set(4, 4, 1);
  return m;
 }
 public static void completeOrtho(Coords V, Coords Vn1, Coords Vn2, CoordMatrix4x4 ret) {
  CoordMatrix4x4.getOrthoVectors(V, Vn1, Vn2);
  ret.setVx(V);
  ret.setVy(Vn1);
  ret.setVz(Vn2);
 }
 public static void createOrthoToDirection(
   Coords origin, Coords direction, int type, Coords Vn1, Coords Vn2, CoordMatrix4x4 ret) {
  getOrthoVectors(direction, Vn1, Vn2);
  ret.setOrigin(origin);
  switch (type) {
   default:
   case VX:
    ret.setVx(direction);
    ret.setVy(Vn1);
    ret.setVz(Vn2);
    break;
   case VY:
    ret.setVx(Vn2);
    ret.setVy(direction);
    ret.setVz(Vn1);
    break;
   case VZ:
    ret.setVx(Vn1);
    ret.setVy(Vn2);
    ret.setVz(direction);
    break;
  }
 }
 public static void createOrthoToDirection(
   Coords origin,
   Coords direction,
   int type,
   Coords vOld,
   Coords Vn1,
   Coords Vn2,
   CoordMatrix4x4 ret) {
  getOrthoVectors(direction, Vn1, Vn2, vOld);
  ret.setOrigin(origin);
  switch (type) {
   default:
   case VX:
    ret.setVx(direction);
    ret.setVy(Vn1);
    ret.setVz(Vn2);
    break;
   case VY:
    ret.setVx(Vn2);
    ret.setVy(direction);
    ret.setVz(Vn1);
    break;
   case VZ:
    ret.setVx(Vn1);
    ret.setVy(Vn2);
    ret.setVz(direction);
    break;
  }
 }
 private static void getOrthoVectors(Coords V, Coords Vn1, Coords Vn2) {
  double y = V.getX();
  if (y != 0) {
   double x = -V.getY();
   double l = MyMath.length(x, y);
   Vn1.setX(x / l);
   Vn1.setY(y / l);
   Vn1.setZ(0);
   Vn1.setW(0);
  } else {
   Vn1.setX(1);
   Vn1.setY(0);
   Vn1.setZ(0);
   Vn1.setW(0);
  }
  Vn2.setCrossProduct4(V, Vn1);
  Vn2.setW(0);
  Vn2.normalize();
 }
 private static void getOrthoVectors(Coords V, Coords Vn1, Coords Vn2, Coords Vn1Old) {
  Vn2.setCrossProduct4(V, Vn1Old);
  Vn1.setCrossProduct4(Vn2, V);
  Vn1.setW(0);
  if (Vn1.isZero()) {
   double y = V.getX();
   if (y != 0) {
    double x = -V.getY();
    double l = MyMath.length(x, y);
    Vn1.setX(x / l);
    Vn1.setY(y / l);
    Vn1.setZ(0);
    Vn1.setW(0);
   } else {
    Vn1.setX(1);
    Vn1.setY(0);
    Vn1.setZ(0);
    Vn1.setW(0);
   }
  } else {
   Vn1.normalize();
  }
  Vn2.setCrossProduct4(V, Vn1);
  Vn2.setW(0);
  Vn2.normalize();
 }
 public CoordMatrix4x4 mul(CoordMatrix4x4 m) {
  CoordMatrix4x4 result = new CoordMatrix4x4();
  this.mul(m, result);
  return result;
 }
 public void mulAllButOrigin(double v) {
  for (int i = 0; i < 3; i++) {
   vectors[i].mulInside(v);
  }
 }
 public void setDiag(double v) {
  for (int i = 1; i <= 3; i++) {
   set(i, i, v);
  }
 }
 public double getUnit(int a_axis) {
  return getColumn(a_axis).norm();
 }
 public CoordMatrix4x4 mirrorY() {
  CoordMatrix4x4 ret = new CoordMatrix4x4();
  ret.setOrigin(getOrigin());
  ret.setVx(getVx().mul(-1));
  ret.setVy(getVy());
  ret.setVz(getVz().mul(-1));
  return ret;
 }
 public CoordMatrix4x4 mirrorX() {
  CoordMatrix4x4 ret = new CoordMatrix4x4();
  ret.setOrigin(getOrigin());
  ret.setVx(getVx());
  ret.setVy(getVy().mul(-1));
  ret.setVz(getVz().mul(-1));
  return ret;
 }
 public CoordMatrix4x4 mirrorO() {
  CoordMatrix4x4 ret = new CoordMatrix4x4();
  ret.setOrigin(getOrigin());
  ret.setVx(getVx().mul(-1));
  ret.setVy(getVy().mul(-1));
  ret.setVz(getVz());
  return ret;
 }
 public void mulInside3x3(double v) {
  for (int i = 0; i < 3; i++) {
   vectors[i].mulInside3(v);
  }
 }
 public void resetLastRowAndColumn() {
  set(1, 4, 0);
  set(2, 4, 0);
  set(3, 4, 0);
  set(4, 1, 0);
  set(4, 2, 0);
  set(4, 3, 0);
  set(4, 4, 1);
 }
}
```

### FILE: kernel/matrix/CoordMatrixUtil.java
```java
public final class CoordMatrixUtil {
 public static Coords[] nearestPointsFromTwoLines(Coords o1, Coords v1, Coords o2, Coords v2) {
  double[] project1 = new double[4], project2 = new double[4], lineCoords = new double[2];
  nearestPointsFromTwoLines(o1, v1, o2, v2, project1, project2, lineCoords, new double[4]);
  return new Coords[] {new Coords(project1), new Coords(project2), new Coords(lineCoords)};
 }
 public static void nearestPointsFromTwoLines(
   Coords o1,
   Coords v1,
   Coords o2,
   Coords v2,
   double[] project1,
   double[] project2,
   double[] lineCoords,
   double[] tmp) {
  Coords vn = v1.crossProduct(v2);
  if (vn.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
   v1.copy(project1);
   v2.copy(project2);
   lineCoords[0] = Double.NaN;
   lineCoords[1] = Double.NaN;
   return;
  }
  o2.projectPlaneNoCheck(v1, vn, v2, o1, project2, tmp);
  lineCoords[1] = -tmp[2]; 
  o1.projectPlaneNoCheck(v2, vn, v1, o2, project1, tmp);
  lineCoords[0] = -tmp[2]; 
 }
 public static Coords[] intersectLinePlane(CoordMatrix line, CoordMatrix plane) {
  Coords v = line.getColumn(1);
  Coords o = line.getColumn(2);
  Coords[] result = new Coords[] {new Coords(4), new Coords(4)};
  o.projectPlaneThruV(plane, v, result[0], result[1]);
  return result;
 }
 public static void sphericalCoords(Coords v, Coords ret) {
  double x = v.get(1);
  double y = v.get(2);
  double z = v.get(3);
  double n2 = x * x + y * y;
  double n1 = Math.sqrt(n2);
  double norm = Math.sqrt(n2 + z * z);
  double a;
  if (n1 == 0) {
   a = 0;
  } else {
   a = Math.acos(x / n1);
   if (y < 0) {
    a *= -1;
   }
  }
  double b;
  if (norm == 0) {
   b = 0;
  } else {
   b = Math.acos(n1 / norm);
   if (z < 0) {
    b *= -1;
   }
  }
  ret.setX(norm);
  ret.setY(a);
  ret.setZ(b);
 }
 public static Coords lineEquationVector(Coords origin, Coords direction, CoordMatrix plane) {
  Coords o = new Coords(4);
  origin.projectPlaneInPlaneCoords(plane, o);
  Coords d = new Coords(4);
  direction.projectPlaneInPlaneCoords(plane, d);
  return lineEquationVector(o, d);
 }
 public static Coords lineEquationVector(Coords origin, Coords direction) {
  if (!DoubleUtil.isZero(origin.getZ()) || !DoubleUtil.isZero(direction.getZ())) {
   return null;
  }
  double x = -direction.getY();
  double y = direction.getX();
  double z = -x * origin.getX() - y * origin.getY();
  return new Coords(x, y, z);
 }
 public static Coords[] intersectPlanes(CoordMatrix plane1, CoordMatrix plane2) {
  Coords vn1 = plane1.getVz();
  Coords vn2 = plane2.getVz();
  Coords v = vn1.crossProduct(vn2);
  Coords direction = new Coords(4);
  Coords origin = new Coords(4);
  if (v.isZero()) { 
   origin.set(plane1.getOrigin()); 
   plane1.getOrigin().projectPlaneInPlaneCoords(plane2, direction);
   if (!DoubleUtil.isZero(direction.getZ())) { 
    origin.set(0);
   }
  } else {
   plane1.getOrigin().projectPlaneThruV(plane2, vn1.crossProduct4(v), origin);
  }
  direction.set(v);
  direction.setW(0); 
  return new Coords[] {origin, direction};
 }
}
```

### FILE: kernel/matrix/CoordNearest.java
```java
public class CoordNearest {
 private Coords point;
 private double currentDistance;
 private Coords currentNearest;
 public CoordNearest(Coords point) {
  this.point = point;
  currentDistance = Double.POSITIVE_INFINITY;
  currentNearest = new Coords(2);
 }
 public boolean check(Coords p) {
  double distance = p.distance(point);
  if (distance < currentDistance) {
   currentDistance = distance;
   currentNearest.set2(p);
   return true;
  }
  return false;
 }
 public Coords get() {
  return currentNearest;
 }
}
```

### FILE: kernel/matrix/CoordSys.java
```java
public class CoordSys {
 public static final CoordSys Identity3D;
 static {
  Identity3D = new CoordSys(2);
  Identity3D.makeCoordSys(new double[] {0, 0, 1, 0}); 
  Identity3D.makeOrthoMatrix(true, true);
 }
 public static final CoordSys XOY;
 static {
  XOY = new CoordSys(2);
  XOY.getEquationVector().set(new double[] {0, 0, 1, 0});
  XOY.addPoint(Coords.O);
  XOY.addVectorWithoutCheckMadeCoordSys(Coords.VX);
  XOY.addVectorWithoutCheckMadeCoordSys(Coords.VY);
  XOY.makeOrthoMatrix(false, false);
 }
 private final CoordMatrix matrix;
 private final int dimension;
 private int madeCoordSys;
 private boolean vxIsZero;
 private CoordMatrix4x4 matrixOrthonormal;
 private CoordMatrix4x4 drawingMatrix;
 private CoordMatrix tempMatrix3x3;
 private final Coords equationVector;
 private final Coords origin;
 private final Coords[] vectors;
 private static final int spaceDimension = 3;
 private final Coords tmpCoords1 = new Coords(4);
 private final Coords tmpCoords2 = new Coords(4);
 private final Coords tmpCoords3 = new Coords(4);
 private final Coords tmpCoords4 = new Coords(4);
 public CoordSys(int dimension) {
  matrix = new CoordMatrix(4, 4);
  matrixOrthonormal = new CoordMatrix4x4();
  drawingMatrix = new CoordMatrix4x4();
  this.dimension = dimension;
  origin = new Coords(spaceDimension + 1);
  origin.set(spaceDimension + 1, 1);
  vectors = new Coords[spaceDimension];
  for (int i = 0; i < spaceDimension; i++) {
   vectors[i] = new Coords(spaceDimension + 1);
  }
  equationVector = new Coords(spaceDimension + 1);
  resetCoordSys();
 }
 public void set(CoordSys cs) {
  setOrigin(cs.getOrigin());
  for (int i = 0; i < spaceDimension; i++) {
   setV(cs.getV(i), i);
  }
  matrix.set(cs.matrix);
  matrixOrthonormal.set(cs.matrixOrthonormal);
  if (drawingMatrix == null) {
   drawingMatrix = new CoordMatrix4x4();
  }
  drawingMatrix.set(cs.drawingMatrix);
  equationVector.set(cs.equationVector);
  madeCoordSys = cs.madeCoordSys;
  vxIsZero = cs.vxIsZero;
 }
 public CoordMatrix getMatrix() {
  return matrix;
 }
 public int getDimension() {
  return dimension;
 }
 public void setOrigin(Coords o) {
  origin.set(o);
 }
 public void setVx(Coords v) {
  setV(v, 0);
 }
 public void setVy(Coords v) {
  setV(v, 1);
 }
 public void setVz(Coords v) {
  setV(v, 2);
 }
 public void setV(Coords v, int i) {
  vectors[i].set(v);
 }
 public Coords getV(int i) {
  return vectors[i];
 }
 public Coords getOrigin() {
  return origin;
 }
 public Coords getVx() {
  return getV(0);
 }
 public Coords getVy() {
  return getV(1);
 }
 public Coords getVz() {
  return getV(2);
 }
 public Coords getPoint(Coords coords2D, Coords result) {
  return getPoint(coords2D.getX(), coords2D.getY(), result);
 }
 public Coords getPoint(double x, double y, Coords result) {
  result.setAdd(matrixOrthonormal.getOrigin(), getVector(x, y, tmpCoords2));
  return result;
 }
 public Coords getPointFromOriginVectors(Coords coords2D, Coords result) {
  return getPointFromOriginVectors(coords2D.getX(), coords2D.getY(), result);
 }
 public Coords getPointFromOriginVectors(double x, double y, Coords result) {
  result.setAdd(origin, getVectorFromVectors(x, y, tmpCoords2));
  return result;
 }
 public Coords getPoint(double x, double y) {
  return matrixOrthonormal.getOrigin().add(getVector(x, y));
 }
 public Coords getPoint(double x, double y, double z) {
  if (DoubleUtil.isZero(z)) {
   return getVector(x, y);
  }
  return getPoint(x / z, y / z);
 }
 public Coords getPoint(double x, double y, double z, Coords result) {
  if (DoubleUtil.isZero(z)) {
   return getVector(x, y, result);
  }
  return getPoint(x / z, y / z, result);
 }
 public Coords getPointForDrawing(double x, double y, Coords result) {
  tmpCoords1.setX(x);
  tmpCoords1.setY(y);
  tmpCoords1.setZ(0);
  tmpCoords1.setW(1);
  return result.setMul(drawingMatrix, tmpCoords1);
 }
 public Coords getPoint(double x) {
  return getOrigin().add(getVx().mul(x));
 }
 public Coords getPoint(double x, Coords result) {
  return result.setAdd(getOrigin(), result.setMul(getVx(), x));
 }
 public Coords getVector(Coords coords2D) {
  return getVector(coords2D.getX(), coords2D.getY());
 }
 public Coords getVector(Coords coords2D, Coords result) {
  return getVector(coords2D.getX(), coords2D.getY(), result);
 }
 public Coords getVector(double x, double y) {
  return matrixOrthonormal.getVx().mul(x).add(matrixOrthonormal.getVy().mul(y));
 }
 public Coords getVector(double x, double y, Coords result) {
  result.setAdd(
    result.setMul(matrixOrthonormal.getVx(), x),
    tmpCoords1.setMul(matrixOrthonormal.getVy(), y));
  return result;
 }
 public Coords getVectorFromVectors(double x, double y, Coords result) {
  result.setAdd(result.setMul(getVx(), x), tmpCoords1.setMul(getVy(), y));
  return result;
 }
 public Coords getNormal() {
  return matrixOrthonormal.getVz();
 }
 public Coords[] getNormalProjection(Coords coords) {
  Coords[] result = new Coords[] {new Coords(4), new Coords(4)};
  coords.projectPlane(this.getMatrixOrthonormal(), result[0], result[1]);
  return result;
 }
 public void setMadeCoordSys(int i) {
  madeCoordSys = i;
 }
 public void setMadeCoordSys() {
  setMadeCoordSys(dimension);
 }
 public void resetCoordSys() {
  setMadeCoordSys(-1);
  vxIsZero = false;
 }
 public int getMadeCoordSys() {
  return madeCoordSys;
 }
 public void completeCoordSys2D() {
  switch (getMadeCoordSys()) {
   default:
    break;
   case 0:
    addVectorWithoutCheckMadeCoordSys(Coords.VX);
    addVectorWithoutCheckMadeCoordSys(Coords.VY);
    break;
   case 1:
    Coords vx = getVx();
    if (DoubleUtil.isZero(vx.getX())) {
     addVectorWithoutCheckMadeCoordSys(new Coords(0, -vx.getZ(), vx.getY(), 0));
    } else {
     addVectorWithoutCheckMadeCoordSys(new Coords(-vx.getY(), vx.getX(), 0, 0));
    }
    break;
  }
 }
 public boolean isMadeCoordSys() {
  return getMadeCoordSys() == dimension;
 }
 public void addPoint(Coords p) {
  if (isMadeCoordSys()) {
   return;
  }
  if (getMadeCoordSys() == -1) {
   setOrigin(p);
   setMadeCoordSys(0);
  } else {
   addVectorWithoutCheckMadeCoordSys(p.sub(getOrigin()));
  }
 }
 public void addVector(Coords v) {
  if (isMadeCoordSys()) {
   return;
  }
  addVectorWithoutCheckMadeCoordSys(v);
 }
 public void addVectorWithoutCheckMadeCoordSys(Coords v) {
  switch (getMadeCoordSys()) {
   default:
    break;
   case 0: 
    setVx(v);
    if (!DoubleUtil.isEqual(v.norm(), 0, Kernel.STANDARD_PRECISION)) {
     setMadeCoordSys(1);
     vxIsZero = false;
    } else {
     vxIsZero = true;
    }
    break;
   case 1: 
    if (getVx().isLinearIndependent(v)) {
     setVy(v);
     getVz().setCrossProduct4(getVx(), getVy());
     setMadeCoordSys(2);
    }
    break;
  }
 }
 public void makeEquationVector() {
  equationVector.setCrossProduct4(getVx(), getVy());
  double d = equationVector.dotproduct(getOrigin());
  equationVector.set(4, -d);
  checkEquationVectorHasJustOneNegativeCoeff();
 }
 private void checkEquationVectorHasJustOneNegativeCoeff() {
  int zeros = 0;
  boolean negative = false;
  for (int i = 1; i <= 3; i++) {
   double coeff = equationVector.get(i);
   if (DoubleUtil.isZero(coeff)) {
    zeros++;
   } else {
    negative = coeff < 0;
   }
  }
  if (zeros == 2 && negative) {
   equationVector.mulInside(-1);
  }
 }
 public final void setEquationVector(double a, double b, double c, double d) {
  equationVector.setX(a);
  equationVector.setY(b);
  equationVector.setZ(c);
  equationVector.setW(d);
  checkEquationVectorHasJustOneNegativeCoeff();
 }
 public void setEquationVector(Coords o, Coords n) {
  setEquationVector(
    n.getX(),
    n.getY(),
    n.getZ(),
    -(n.getX() * o.getX() + n.getY() * o.getY() + n.getZ() * o.getZ()));
 }
 public void setEquationVector(Coords cA, Coords cB, Coords cC) {
  tmpCoords1.setSub(cB, cA);
  tmpCoords2.setSub(cC, cA);
  tmpCoords3.setCrossProduct4(tmpCoords1, tmpCoords2);
  setEquationVector(cA, tmpCoords3);
 }
 public Coords getEquationVector() {
  return equationVector;
 }
 public void makeCoordSys(double a, double b, double c, double d) {
  resetCoordSys();
  equationVector.set(a, b, c, d);
  makeCoordSys();
 }
 public void makeCoordSys(double[] vals) {
  resetCoordSys();
  equationVector.set(vals);
  makeCoordSys();
 }
 private void makeCoordSys() {
  double[] vals = equationVector.get();
  Coords o = new Coords(4);
  boolean originSet = false;
  double val = vals[vals.length - 1];
  for (int i = 0; i < vals.length - 1 && !originSet; i++) {
   if (!DoubleUtil.isEpsilon(vals[i], val)) {
    o.set(i + 1, -val / vals[i]);
    originSet = true;
   }
  }
  if (!originSet) {
   return;
  }
  o.set(vals.length, 1);
  addPoint(o);
  Coords[] v = equationVector.completeOrthonormal();
  addVectorWithoutCheckMadeCoordSys(v[1]);
  addVectorWithoutCheckMadeCoordSys(v[0]);
 }
 public boolean makeOrthoMatrix(boolean projectOrigin, boolean firstVectorParallelToXOY) {
  if (!isMadeCoordSys()) {
   if (dimension == 1) {
    matrixOrthonormal.set(0);
    if (getMadeCoordSys() == 0) {
     matrixOrthonormal.setOrigin(getOrigin());
    }
    if (!hasZeroVx()) {
     getVx().set(0);
    }
   }
   return false;
  }
  if (dimension == 1) {
   Coords vy = getVy();
   vy.setCrossProduct4(Coords.VZ, getVx());
   if (vy.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
    setVy(Coords.VX);
    setVz(Coords.VY);
   } else {
    getVz().setCrossProduct4(getVx(), getVy());
   }
   if (projectOrigin) { 
    Coords.O.projectPlane(getMatrixOrthonormal(), tmpCoords1);
   } else {
    tmpCoords1.set(getOrigin());
   }
   matrixOrthonormal.set(
     new Coords[] {getVx().normalized(), getVy().normalized(), getVz().normalized(), tmpCoords1
     });
   return true;
  }
  if (dimension == 2) { 
   if (firstVectorParallelToXOY) {
    tmpCoords1.setCrossProduct4(getVz(), Coords.VZ);
    tmpCoords1.setW(0);
    if (!tmpCoords1.equalsForKernel(0, Kernel.STANDARD_PRECISION)) {
     tmpCoords1.normalize();
     tmpCoords2.setCrossProduct4(getVz(), tmpCoords1);
     tmpCoords2.setW(0);
     tmpCoords2.normalize();
     tmpCoords3.setNormalized(getVz());
    } else {
     tmpCoords3.set(0, 0, 1, 0);
     tmpCoords1.set(1, 0, 0, 0);
     tmpCoords2.set(0, 1, 0, 0);
    }
   } else {
    tmpCoords1.setNormalized(getVx(), true);
    tmpCoords3.setCrossProduct4(tmpCoords1, getVy());
    tmpCoords3.setW(0);
    tmpCoords3.normalize(true);
    tmpCoords2.setCrossProduct4(tmpCoords3, tmpCoords1);
    tmpCoords2.setW(0);
   }
   matrixOrthonormal.setOrigin(getOrigin());
   matrixOrthonormal.setVx(tmpCoords1);
   matrixOrthonormal.setVy(tmpCoords2);
   matrixOrthonormal.setVz(tmpCoords3);
   Coords.O.projectPlane(getMatrixOrthonormal(), tmpCoords3);
   if (projectOrigin) { 
    matrixOrthonormal.setOrigin(tmpCoords3);
   }
   CoordMatrix4x4.createOrthoToDirection(
     tmpCoords3,
     matrixOrthonormal.getVz(),
     CoordMatrix4x4.VZ,
     tmpCoords1,
     tmpCoords2,
     drawingMatrix);
   return true;
  }
  return false;
 }
 public boolean isDefined() {
  return isMadeCoordSys();
 }
 public void setUndefined() {
  resetCoordSys();
  equationVector.set(Double.NaN);
 }
 public CoordMatrix4x4 getMatrixOrthonormal() {
  return matrixOrthonormal;
 }
 public CoordMatrix4x4 getDrawingMatrix() {
  return drawingMatrix;
 }
 public void setSimpleCoordSysWithOrigin(Coords m) {
  setOrigin(m);
  setVx(Coords.VX);
  setVy(Coords.VY);
  setVz(Coords.VZ);
  matrixOrthonormal = CoordMatrix4x4.identity();
  matrixOrthonormal.setOrigin(m);
  drawingMatrix = CoordMatrix4x4.identity();
  drawingMatrix.setOrigin(m);
 }
 public void translate(Coords v) {
  Coords o = matrixOrthonormal.getOrigin();
  o.addInside(v);
  matrixOrthonormal.setOrigin(o);
  if (dimension == 2) {
   drawingMatrix.setOrigin(o);
  }
  setOrigin(o);
  if (dimension == 2) {
   Coords.O.projectPlane(matrixOrthonormal, tmpCoords3);
   drawingMatrix.setOrigin(tmpCoords3);
  }
 }
 public void translateEquationVector(Coords v) {
  translateEquationVector(equationVector, v);
 }
 public static void translateEquationVector(Coords eqV, Coords v) {
  eqV.setW(eqV.getW() - v.dotproduct(eqV));
 }
 public double[] matrixTransform(CoordMatrix4x4 m) {
  double[] ret;
  Coords o = m.mul(matrixOrthonormal.getOrigin());
  Coords vx = m.mul(matrixOrthonormal.getVx());
  Coords vy = m.mul(matrixOrthonormal.getVy());
  Coords vn = vx.crossProduct4(vy);
  if (vn.isZero()) { 
   if (vx.isZero()) {
    if (vy.isZero()) { 
     ret = new double[] {0, 0, 0};
     CoordMatrix4x4.identity(matrixOrthonormal);
     matrixOrthonormal.setOrigin(o);
    } else { 
     vy.calcNorm();
     double l = vy.getNorm();
     ret = new double[] {0, 0, l};
     CoordMatrix4x4.createOrthoToDirection(
       o, vy.mul(1 / l), CoordMatrix4x4.VY, tmpCoords1, tmpCoords2, matrixOrthonormal);
    }
   } else { 
    vx.calcNorm();
    double l = vx.getNorm();
    vx = vx.mul(1 / l);
    double a = vy.dotproduct(vx); 
    ret = new double[] {l, a, 0};
    CoordMatrix4x4.createOrthoToDirection(
      o, vx, CoordMatrix4x4.VX, tmpCoords1, tmpCoords2, matrixOrthonormal);
   }
  } else { 
   vx.calcNorm();
   double l = vx.getNorm();
   vx = vx.mul(1 / l);
   vn.normalize();
   Coords vyn = vn.crossProduct4(vx);
   double a = vy.dotproduct(vx);
   double b = vy.dotproduct(vyn);
   ret = new double[] {l, a, b};
   matrixOrthonormal.setVx(vx);
   matrixOrthonormal.setVy(vyn);
   matrixOrthonormal.setVz(vn);
   matrixOrthonormal.setOrigin(o);
  }
  setOrigin(o);
  setVx(m.mul(getVx()));
  if (dimension == 2) {
   setVy(m.mul(getVy()));
   setVz(m.mul(getVz()));
   setDrawingMatrixFromMatrixOrthonormal();
  }
  return ret;
 }
 private void setDrawingMatrixFromMatrixOrthonormal(Coords vx) {
  Coords.O.projectPlane(matrixOrthonormal, tmpCoords3);
  CoordMatrix4x4.createOrthoToDirection(
    tmpCoords3,
    matrixOrthonormal.getVz(),
    CoordMatrix4x4.VZ,
    vx,
    tmpCoords1,
    tmpCoords2,
    drawingMatrix);
 }
 private void setDrawingMatrixFromMatrixOrthonormal() {
  Coords.O.projectPlane(matrixOrthonormal, tmpCoords3);
  CoordMatrix4x4.createOrthoToDirection(
    tmpCoords3,
    matrixOrthonormal.getVz(),
    CoordMatrix4x4.VZ,
    tmpCoords1,
    tmpCoords2,
    drawingMatrix);
 }
 public void setMatrixOrthonormalAndDrawingMatrix() {
  matrixOrthonormal.setOrigin(getOrigin());
  matrixOrthonormal.setVx(getVx());
  matrixOrthonormal.setVy(getVy());
  matrixOrthonormal.setVz(getVz());
  setDrawingMatrixFromMatrixOrthonormal();
 }
 public void rotate(double phi, Coords center) {
  if (tempMatrix3x3 == null) {
   tempMatrix3x3 = new CoordMatrix(3, 3);
  }
  CoordMatrix.rotation3x3(phi, tempMatrix3x3);
  Coords o = matrixOrthonormal.getOrigin();
  matrixOrthonormal = tempMatrix3x3.mul3x3(matrixOrthonormal);
  matrixOrthonormal.setOrigin(tempMatrix3x3.mul(o.sub(center)).add(center));
  matrixOrthonormal.set(4, 4, 1);
  setOrigin(o);
  setVx(tempMatrix3x3.mul(getVx()));
  if (dimension == 2) {
   setVy(tempMatrix3x3.mul(getVy()));
   setVz(tempMatrix3x3.mul(getVz()));
   setDrawingMatrixFromMatrixOrthonormal();
  }
 }
 public void rotate(CoordMatrix rot, Coords center) {
  Coords o = matrixOrthonormal.getOrigin();
  Coords newOrigin = rot.mul(o.sub(center)).add(center);
  Coords vx = matrixOrthonormal.getVx();
  Coords vz = new Coords(4);
  vz.setValues(rot.mul(matrixOrthonormal.getVz()), 3);
  CoordMatrix4x4.createOrthoToDirection(
    newOrigin, vz, CoordMatrix4x4.VZ, vx, tmpCoords1, tmpCoords2, matrixOrthonormal);
  setOrigin(newOrigin);
  setVx(matrixOrthonormal.getVx());
  if (dimension == 2) {
   setVy(matrixOrthonormal.getVy());
   setVz(matrixOrthonormal.getVz());
   setDrawingMatrixFromMatrixOrthonormal(drawingMatrix.getVx());
  }
 }
 public void rotate(double phi, Coords center, Coords direction) {
  if (tempMatrix3x3 == null) {
   tempMatrix3x3 = new CoordMatrix(3, 3);
  }
  CoordMatrix.rotation3x3(direction, phi, tempMatrix3x3);
  Coords o = matrixOrthonormal.getOrigin();
  matrixOrthonormal = tempMatrix3x3.mul3x3(matrixOrthonormal);
  Coords newOrigin = tempMatrix3x3.mul(o.sub(center)).add(center);
  matrixOrthonormal.setOrigin(newOrigin);
  matrixOrthonormal.set(4, 4, 1);
  setOrigin(newOrigin);
  setVx(tempMatrix3x3.mul(getVx()));
  if (dimension == 2) {
   setVy(tempMatrix3x3.mul(getVy()));
   setVz(tempMatrix3x3.mul(getVz()));
   setDrawingMatrixFromMatrixOrthonormal();
  }
 }
 public void dilate(double r, Coords point) {
  if (r < 0) { 
   matrixOrthonormal.mulInside3x3(-1);
  }
  Coords o = matrixOrthonormal.getOrigin();
  tmpCoords1.setMul3(o, r);
  tmpCoords2.setMul3(point, 1 - r);
  tmpCoords1.setAdd3(tmpCoords1, tmpCoords2);
  tmpCoords1.setW(1);
  matrixOrthonormal.setOrigin(tmpCoords1);
  setOrigin(tmpCoords1);
  if (r < 0) {
   getVx().mulInside(-1);
  }
  if (dimension == 2) {
   if (r < 0) {
    getVy().mulInside(-1);
    getVz().mulInside(-1);
   }
   setDrawingMatrixFromMatrixOrthonormal();
  }
 }
 public void dilateEquationVector(double r, Coords point) {
  translateEquationVector(point.mul(1 - r));
 }
 public void mirror(Coords point) {
  matrixOrthonormal.mulInside(-1);
  matrixOrthonormal.addToOrigin(point.mul(2));
  setOrigin(matrixOrthonormal.getOrigin());
  getVx().mulInside(-1);
  if (dimension == 2) {
   getVy().mulInside(-1);
   getVz().mulInside(-1);
   setDrawingMatrixFromMatrixOrthonormal();
  }
 }
 public void mirrorEquationVector(Coords point) {
  translateEquationVector(point.mul(2));
 }
 public void mirror(Coords point, Coords direction) {
  matrixOrthonormal.getOrigin().projectLine(point, direction, tmpCoords1, null);
  double x = 2 * matrixOrthonormal.getVx().dotproduct(direction);
  double y = 2 * matrixOrthonormal.getVy().dotproduct(direction);
  double z = 2 * matrixOrthonormal.getVz().dotproduct(direction);
  matrixOrthonormal.mulInside(-1);
  matrixOrthonormal.addToVx(direction.mul(x));
  matrixOrthonormal.addToVy(direction.mul(y));
  matrixOrthonormal.addToVz(direction.mul(z));
  matrixOrthonormal.addToOrigin(tmpCoords1.mul(2));
  setOrigin(matrixOrthonormal.getOrigin());
  double p = 2 * getVx().dotproduct(direction);
  setVx(getVx().mul(-1).add(direction.mul(p)));
  if (dimension == 2) {
   p = 2 * getVy().dotproduct(direction);
   setVy(getVy().mul(-1).add(direction.mul(p)));
   p = 2 * getVz().dotproduct(direction);
   setVz(getVz().mul(-1).add(direction.mul(p)));
   setDrawingMatrixFromMatrixOrthonormal();
  }
 }
 public void mirror(CoordSys cs) {
  Coords vn = cs.getNormal();
  Coords o = matrixOrthonormal.getOrigin();
  o.projectPlane(cs.getMatrixOrthonormal(), tmpCoords1);
  double x = -2 * matrixOrthonormal.getVx().dotproduct(vn);
  double y = -2 * matrixOrthonormal.getVy().dotproduct(vn);
  double z = -2 * matrixOrthonormal.getVz().dotproduct(vn);
  matrixOrthonormal.addToVx(tmpCoords2.setMul(vn, x));
  matrixOrthonormal.addToVy(tmpCoords2.setMul(vn, y));
  matrixOrthonormal.addToVz(tmpCoords2.setMul(vn, z));
  matrixOrthonormal.setOrigin(tmpCoords2.setSub(tmpCoords2.setMul(tmpCoords1, 2), o));
  setOrigin(matrixOrthonormal.getOrigin());
  double p = -2 * getVx().dotproduct(vn);
  setVx(tmpCoords2.setAdd(getVx(), tmpCoords2.setMul(vn, p)));
  if (dimension == 2) {
   p = -2 * getVy().dotproduct(vn);
   setVy(tmpCoords2.setAdd(getVy(), tmpCoords2.setMul(vn, p)));
   p = -2 * getVz().dotproduct(vn);
   setVz(tmpCoords2.setAdd(getVz(), tmpCoords2.setMul(vn, p)));
   setDrawingMatrixFromMatrixOrthonormal();
  }
 }
 public void updateContinuous(CoordSys coordsys) {
  matrixOrthonormal.getOrigin().projectPlane(coordsys.getMatrixOrthonormal(), tmpCoords1);
  Coords vz = coordsys.getMatrixOrthonormal().getVz();
  if (matrixOrthonormal.getVz().dotproduct(vz) < 0) {
   vz.mulInside3(-1);
  }
  CoordMatrix4x4.createOrthoToDirection(
    tmpCoords1,
    vz,
    CoordMatrix4x4.VZ,
    matrixOrthonormal.getVx(),
    tmpCoords2,
    tmpCoords3,
    matrixOrthonormal);
  setFromMatrixOrthonormal();
 }
 public void updateToContainPoint(Coords point) {
  point.projectPlane(matrixOrthonormal, tmpCoords1);
  tmpCoords1.setSub(point, tmpCoords1);
  matrixOrthonormal.addToOrigin(tmpCoords1);
  setFromMatrixOrthonormal();
 }
 public void updateContinuousPointVx(Coords point, Coords vector) {
  tmpCoords2.setCrossProduct4(matrixOrthonormal.getVz(), vector);
  tmpCoords3.setCrossProduct4(vector, tmpCoords2);
  tmpCoords3.setW(0);
  tmpCoords3.normalize();
  CoordMatrix4x4.createOrthoToDirection(
    matrixOrthonormal.getOrigin(),
    tmpCoords3,
    CoordMatrix4x4.VZ,
    matrixOrthonormal.getVx(),
    tmpCoords2,
    tmpCoords4,
    matrixOrthonormal);
  updateToContainPoint(point);
 }
 private void setFromMatrixOrthonormal() {
  setOrigin(matrixOrthonormal.getOrigin());
  setVx(matrixOrthonormal.getVx());
  if (dimension == 2) {
   setVy(matrixOrthonormal.getVy());
   setVz(matrixOrthonormal.getVz());
   setDrawingMatrixFromMatrixOrthonormal(drawingMatrix.getVx());
  }
 }
 public CoordMatrix getParametricMatrix(CoordMatrix parametricMatrix) {
  CoordMatrix4x4 m4 = this.getMatrixOrthonormal();
  parametricMatrix.setVx(m4.getVx());
  parametricMatrix.setVy(m4.getVy());
  parametricMatrix.setOrigin(m4.getOrigin());
  return parametricMatrix;
 }
 public void setXequal(double value) {
  resetCoordSys();
  equationVector.set(new double[] {1, 0, 0, -value});
  origin.setX(value);
  origin.setY(0);
  origin.setZ(0);
  origin.setW(1);
  Coords v = getVx();
  v.setX(0);
  v.setY(1);
  v.setZ(0);
  v.setW(0);
  v = getVy();
  v.setX(0);
  v.setY(0);
  v.setZ(1);
  v.setW(0);
  setMadeCoordSys(2);
  makeOrthoMatrix(false, false);
 }
 public void setYequal(double a, double b, double d) {
  resetCoordSys();
  equationVector.set(new double[] {a, b, 0, d});
  origin.setX(0);
  origin.setY(-d / b);
  origin.setZ(0);
  origin.setW(1);
  Coords v = getVx();
  v.setX(1);
  v.setY(-a / b);
  v.setZ(0);
  v.setW(0);
  v = getVy();
  v.setX(0);
  v.setY(0);
  v.setZ(1);
  v.setW(0);
  setMadeCoordSys(2);
  makeOrthoMatrix(false, false);
 }
 public void setZequal(double a, double b, double c, double d) {
  resetCoordSys();
  equationVector.set(new double[] {a, b, c, d});
  origin.setX(0);
  origin.setY(0);
  origin.setZ(-d / c);
  origin.setW(1);
  Coords v = getVx();
  v.setX(1);
  v.setY(0);
  v.setZ(-a / c);
  v.setW(0);
  v = getVy();
  v.setX(0);
  v.setY(1);
  v.setZ(-b / c);
  v.setW(0);
  setMadeCoordSys(2);
  makeOrthoMatrix(false, false);
 }
 public boolean hasZeroVx() {
  return vxIsZero;
 }
}
```

### FILE: kernel/matrix/Coords.java
```java
public class Coords implements AnimatableValue<Coords> {
 private double norm;
 private double sqNorm;
 private boolean calcNorm = true;
 private boolean calcSqNorm = true;
 public static final Coords O = new Coords(0, 0, 0, 1);
 public static final Coords ZERO = new Coords(0, 0, 0, 0);
 public static final Coords VX = new Coords(1, 0, 0, 0);
 public static final Coords VY = new Coords(0, 1, 0, 0);
 public static final Coords VZ = new Coords(0, 0, 1, 0);
 public static final Coords VZm = new Coords(0, 0, -1, 0);
 public static final Coords UNDEFINED =
   new Coords(Double.NaN, Double.NaN, Double.NaN, Double.NaN) {
    public boolean isNotFinalUndefined() {
     return false;
    }
    public boolean isFinalUndefined() {
     return true;
    }
   };
 public static final Coords UNDEFINED3VALUE0 = new Coords(0, 0, 0) {
  public boolean isNotFinalUndefined() {
   return false;
  }
  public boolean isFinalUndefined() {
   return true;
  }
 };
 public static final Coords BLACK = new Coords(0, 0, 0, 1);
 public static final Coords DARK_GRAY = new Coords(68.0 / 255.0, 68.0 / 255.0, 68.0 / 255.0, 1);
 public final double[] val;
 private int rows;
 private double[][] matrixForSolve;
 public static Coords createInhomCoorsInD3() {
  Coords ret = new Coords(4);
  ret.setW(1);
  return ret;
 }
 public Coords(int rows) {
  this.rows = rows;
  val = new double[rows];
 }
 public Coords(double[] vals) {
  this(vals.length);
  for (int i = 0; i < vals.length; i++) {
   val[i] = vals[i];
  }
 }
 public Coords(Coords v) {
  this(v.val);
 }
 public Coords(double u, double v) {
  this(2);
  val[0] = u;
  val[1] = v;
 }
 public Coords(double x, double y, double z) {
  this(3);
  val[0] = x;
  val[1] = y;
  val[2] = z;
 }
 public Coords(double x, double y, double z, double w) {
  this(4);
  val[0] = x;
  val[1] = y;
  val[2] = z;
  val[3] = w;
 }
 public void set(int i, double val0) {
  val[i - 1] = val0;
  calcNorm = calcSqNorm = true;
 }
 public void set(double x, double y, double z, double w) {
  val[0] = x;
  val[1] = y;
  val[2] = z;
  val[3] = w;
  calcNorm = calcSqNorm = true;
 }
 public void set(double[] vals0) {
  for (int i = 0; i < vals0.length; i++) {
   val[i] = vals0[i];
  }
  calcNorm = calcSqNorm = true;
 }
 public void set(double x, double y, double z) {
  val[0] = x;
  val[1] = y;
  val[2] = z;
 }
 public void setValues(Coords v, int length) {
  for (int i = 0; i < length; i++) {
   val[i] = v.val[i];
  }
 }
 public void set(Coords v) {
  set(v.val);
 }
 public void set3(Coords v) {
  val[0] = v.val[0];
  val[1] = v.val[1];
  val[2] = v.val[2];
 }
 public void set4(Coords v) {
  val[0] = v.val[0];
  val[1] = v.val[1];
  val[2] = v.val[2];
  val[3] = v.val[3];
 }
 public void set2(Coords v) {
  val[0] = v.val[0];
  val[1] = v.val[1];
 }
 public void set(double val0) {
  for (int i = 0; i < rows; i++) {
   val[i] = val0;
  }
  norm = Math.sqrt(rows) * Math.abs(val0);
  calcNorm = calcSqNorm = true;
 }
 public double get(int i) {
  return val[i - 1];
 }
 public double getChecked(int i) {
  return i > val.length ? 0 : val[i - 1];
 }
 public void copy(double[] ret) {
  for (int i = 0; i < rows; i++) {
   ret[i] = val[i];
  }
 }
 public double getX() {
  return val[0];
 }
 public double getY() {
  return val[1];
 }
 public double getZ() {
  if (val.length > 2) {
   return val[2];
  }
  return 0; 
 }
 public double getW() {
  return val[3];
 }
 public double getLast() {
  return val[rows - 1];
 }
 public void setX(double val) {
  this.val[0] = val;
  calcNorm = calcSqNorm = true;
 }
 public void setY(double val) {
  this.val[1] = val;
  calcNorm = calcSqNorm = true;
 }
 public void setZ(double val) {
  this.val[2] = val;
  calcNorm = calcSqNorm = true;
 }
 public void setW(double val) {
  this.val[3] = val;
  calcNorm = calcSqNorm = true;
 }
 public int getLength() {
  return rows;
 }
 public Coords copyVector() {
  Coords result = new Coords(rows);
  for (int i = 0; i < rows; i++) {
   result.val[i] = val[i];
  }
  return result;
 }
 public Coords subVector(int start, int end) {
  int r = end - start + 1;
  Coords result = new Coords(r);
  for (int i = 0; i < r; i++) {
   result.val[i] = val[start + i - 1];
  }
  return result;
 }
 public Coords setSubVector(Coords v, int start, int end) {
  int r = end - start + 1;
  for (int i = 0; i < r; i++) {
   val[i] = v.val[start + i - 1];
  }
  return this;
 }
 public Coords subVector(int row) {
  int r = rows;
  Coords result = new Coords(r - 1);
  int shift = 0;
  for (int i = 0; i < r; i++) {
   if (i == row) {
    shift = 1;
   } else {
    result.val[i] = val[i + shift];
   }
  }
  return result;
 }
 public Coords setSubVector(Coords v, int row) {
  for (int i = 0; i < row; i++) {
   val[i] = v.val[i];
  }
  for (int i = row; i < rows; i++) {
   val[i] = v.val[i + 1];
  }
  return this;
 }
 public double dotproduct(Coords v) {
  int len = Math.min(getLength(), v.getLength());
  double res = 0;
  for (int i = 0; i < len; i++) {
   res += val[i] * v.val[i];
  }
  return res;
 }
 public double dotproduct3(Coords v) {
  double res = 0;
  for (int i = 0; i < 3; i++) {
   res += val[i] * v.val[i];
  }
  return res;
 }
 public final boolean isDependentToOrtho(Coords u, Coords v) {
  double value = (u.getY() * v.getZ() - u.getZ() * v.getY()) * getX()
    + (u.getZ() * v.getX() - u.getX() * v.getZ()) * getY()
    + (u.getX() * v.getY() - u.getY() * v.getX()) * getZ();
  return DoubleUtil.isZero(value);
 }
 public final Coords crossProduct(Coords v) {
  Coords ret = new Coords(3);
  ret.setCrossProduct3(this, v);
  return ret;
 }
 public final Coords crossProduct4(Coords v) {
  Coords ret = new Coords(4);
  ret.setCrossProduct4(this, v);
  return ret;
 }
 public final void setCrossProduct3(Coords v1, Coords v2) {
  val[0] = v1.val[1] * v2.val[2] - v1.val[2] * v2.val[1];
  val[1] = v1.val[2] * v2.val[0] - v1.val[0] * v2.val[2];
  val[2] = v1.val[0] * v2.val[1] - v1.val[1] * v2.val[0];
  calcNorm = calcSqNorm = true;
 }
 public final void setCrossProduct4(Coords v1, Coords v2) {
  setCrossProduct3(v1, v2);
  setW(0);
 }
 public final double dotCrossProduct(Coords v1, Coords v2) {
  return val[0] * (v1.val[1] * v2.val[2] - v1.val[2] * v2.val[1])
    + val[1] * (v1.val[2] * v2.val[0] - v1.val[0] * v2.val[2])
    + val[2] * (v1.val[0] * v2.val[1] - v1.val[1] * v2.val[0]);
 }
 public final boolean isLinearIndependent(Coords v) {
  double value;
  value = val[1] * v.val[2] - val[2] * v.val[1];
  if (!DoubleUtil.isZero(value)) {
   return true;
  }
  value = val[2] * v.val[0] - val[0] * v.val[2];
  if (!DoubleUtil.isZero(value)) {
   return true;
  }
  value = val[0] * v.val[1] - val[1] * v.val[0];
  return !DoubleUtil.isZero(value);
 }
 public final boolean isLinearIndependentAllCoords(Coords v) {
  int index = 0;
  boolean notFound = true;
  double r1 = 0, r2 = 0;
  while (notFound && index < getLength()) {
   double c1 = val[index];
   double c2 = v.val[index];
   if (DoubleUtil.isZero(c1)) {
    if (!DoubleUtil.isZero(c2)) {
     return true;
    }
   } else {
    if (DoubleUtil.isZero(c2)) {
     return true;
    }
    notFound = false;
    r1 = c1;
    r2 = c2;
   }
   index++;
  }
  while (index < getLength()) {
   double value = r1 * v.val[index] - val[index] * r2;
   if (!DoubleUtil.isZero(value)) {
    return true;
   }
   index++;
  }
  return false;
 }
 public double norm() {
  if (calcNorm) {
   calcNorm();
   calcNorm = false;
  }
  return norm;
 }
 public double calcNorm() {
  calcSquareNorm();
  norm = Math.sqrt(sqNorm);
  return norm;
 }
 public double calcNorm3() {
  return Math.sqrt(this.dotproduct3(this));
 }
 public double calcSquareNorm() {
  sqNorm = 0;
  for (int i = 0; i < val.length; i++) {
   sqNorm += val[i] * val[i];
  }
  return sqNorm;
 }
 public double getNorm() {
  return norm;
 }
 public double squareNorm() {
  if (calcSqNorm) {
   calcSquareNorm();
   calcSqNorm = false;
  }
  return sqNorm;
 }
 public Coords normalized() {
  return normalized(false);
 }
 public Coords normalized(boolean checkOneDirection) {
  Coords ret = new Coords(getLength());
  calcNorm();
  double normInv = 1 / getNorm();
  int len = getLength();
  for (int i = 0; i < len; i++) {
   double v = val[i] * normInv;
   if (checkOneDirection && DoubleUtil.isEqual(Math.abs(v), 1)) {
    if (v < 0) {
     ret.val[i] = -1;
    } else {
     ret.val[i] = 1;
    }
    for (int j = 0; j < i; j++) {
     ret.val[j] = 0;
    }
    for (int j = i + 1; j < len; j++) {
     ret.val[j] = 0;
    }
    break;
   }
   ret.val[i] = v;
  }
  return ret;
 }
 public Coords setNormalized(Coords vector) {
  return setNormalized(vector, false);
 }
 public Coords setNormalized(Coords vector, boolean checkOneDirection) {
  vector.calcNorm();
  double normInv = 1 / vector.getNorm();
  for (int i = 0; i < rows; i++) {
   double v = vector.val[i] * normInv;
   if (checkOneDirection && DoubleUtil.isEqual(Math.abs(v), 1)) {
    if (v < 0) {
     val[i] = -1;
    } else {
     val[i] = 1;
    }
    for (int j = 0; j < i; j++) {
     val[j] = 0;
    }
    for (int j = i + 1; j < rows; j++) {
     val[j] = 0;
    }
    break;
   }
   val[i] = v;
  }
  return this;
 }
 public void normalized(Coords ret) {
  calcNorm();
  double normInv = 1 / getNorm();
  for (int i = 0; i < ret.rows; i++) {
   double v = val[i] * normInv;
   ret.val[i] = v;
  }
 }
 public Coords normalize() {
  normalize(true);
  return this;
 }
 public Coords normalize(boolean recalcNorm) {
  if (recalcNorm) {
   calcNorm();
  }
  double normInv = 1 / getNorm();
  int len = getLength();
  for (int i = 0; i < len; i++) {
   val[i] *= normInv;
  }
  norm = sqNorm = 1.0;
  return this;
 }
 public double distance(Coords v) {
  return this.sub(v).norm();
 }
 public double distance3(Coords v) {
  return MyMath.length(val[0] - v.val[0], val[1] - v.val[1], val[2] - v.val[2]);
 }
 public double squareDistance3(Coords v) {
  double x = getX() - v.getX();
  double y = getY() - v.getY();
  double z = getZ() - v.getZ();
  return x * x + y * y + z * z;
 }
 private Coords vectorToLine(Coords lineO, Coords V) {
  Coords OM = this.sub(lineO);
  Coords N = V.normalized();
  Coords OH = N.mul(OM.dotproduct(N)); 
  return OM.sub(OH);
 }
 public double distLine(Coords lineO, Coords V) {
  return vectorToLine(lineO, V).norm();
 }
 public double squareDistLine3(Coords lineO, Coords V) {
  Coords v = vectorToLine(lineO, V);
  return v.getX() * v.getX() + v.getY() * v.getY() + v.getZ() * v.getZ();
 }
 public double distPlane(Coords o, Coords vn) {
  return Math.abs(distPlaneOriented(o, vn));
 }
 public double distPlaneOriented(Coords o, Coords vn) {
  return this.sub(o).dotproduct(vn);
 }
 public void projectPlane(CoordMatrix m, Coords globalCoords, Coords inPlaneCoords) {
  projectPlane(m.getVx(), m.getVy(), m.getVz(), m.getOrigin(), globalCoords, inPlaneCoords);
 }
 public void projectPlane(
   Coords vx, Coords vy, Coords vz, Coords o, Coords globalCoords, Coords inPlaneCoords) {
  projectPlane(vx, vy, vz, o, globalCoords.val, inPlaneCoords.val);
 }
 public void projectPlane(
   Coords vx, Coords vy, Coords vz, Coords o, double[] globalCoords, double[] inPlaneCoords) {
  if (DoubleUtil.isEqual(vx.crossProduct(vy).dotproduct(vz), 0, Kernel.STANDARD_PRECISION)) {
   inPlaneCoords[0] = 0; 
   inPlaneCoords[1] = 0; 
   inPlaneCoords[2] = -1; 
   inPlaneCoords[3] = 0; 
   globalCoords[0] = vz.getX(); 
   globalCoords[1] = vz.getY(); 
   globalCoords[2] = vz.getZ(); 
   globalCoords[3] = vz.getW(); 
   return;
  }
  projectPlaneNoCheck(vx, vy, vz, o, globalCoords, inPlaneCoords);
 }
 public void projectPlaneInPlaneCoords(CoordMatrix m, Coords inPlaneCoords) {
  projectPlaneInPlaneCoords(m.getVx(), m.getVy(), m.getVz(), m.getOrigin(), inPlaneCoords);
 }
 public void projectPlaneInPlaneCoords(
   Coords vx, Coords vy, Coords vz, Coords o, Coords inPlaneCoords) {
  if (vz.isDependentToOrtho(vx, vy)) {
   inPlaneCoords.setX(0);
   inPlaneCoords.setY(0);
   inPlaneCoords.setZ(-1);
   inPlaneCoords.setW(0);
   return;
  }
  projectPlaneNoCheckInPlaneCoords(vx, vy, vz, o, inPlaneCoords.val);
 }
 public void projectPlane(CoordMatrix m, Coords globalCoords) {
  projectPlane(m.getVx(), m.getVy(), m.getVz(), m.getOrigin(), globalCoords);
 }
 public void projectPlane(Coords vx, Coords vy, Coords vz, Coords o, Coords globalCoords) {
  if (vz.isDependentToOrtho(vx, vy)) {
   globalCoords.set(vz);
   return;
  }
  projectPlaneNoCheck(vx, vy, vz, o, globalCoords.val, globalCoords.val);
  if (vx.getZ() == 0 && vy.getZ() == 0) {
   globalCoords.setZ(o.getZ());
  }
 }
 public final Coords projectPlaneWithInverseMatrix(CoordMatrix m) {
  return m.mul(this);
 }
 public void projectPlaneNoCheck(
   Coords vx, Coords vy, Coords vz, Coords o, double[] globalCoords, double[] inPlaneCoords) {
  projectPlaneNoCheckInPlaneCoords(vx, vy, vz, o, inPlaneCoords);
  double coeff = -inPlaneCoords[2]; 
  vz.mul(coeff, globalCoords);
  this.add(globalCoords, globalCoords);
 }
 public void projectPlaneNoCheckInPlaneCoords(
   Coords vx, Coords vy, Coords vz, Coords o, double[] inPlaneCoords) {
  int size = getLength();
  if (matrixForSolve == null) {
   matrixForSolve = new double[size][size];
  }
  CoordMatrix.solve(matrixForSolve, inPlaneCoords, this, vx, vy, vz, o);
 }
 public void projectPlaneThruV(
   CoordMatrix m, Coords v, Coords globalCoords, Coords inPlaneCoords) {
  projectPlane(m.getVx(), m.getVy(), v, m.getOrigin(), globalCoords, inPlaneCoords);
 }
 public void projectPlaneThruV(CoordMatrix m, Coords v, Coords globalCoords) {
  projectPlane(m.getVx(), m.getVy(), v, m.getOrigin(), globalCoords);
 }
 public void projectPlaneThruVInPlaneCoords(CoordMatrix m, Coords v, Coords inPlaneCoords) {
  projectPlaneInPlaneCoords(m.getVx(), m.getVy(), v, m.getOrigin(), inPlaneCoords);
 }
 public void projectPlaneThruVIfPossible(
   CoordMatrix m, Coords v, Coords globalCoords, Coords inPlaneCoords) {
  Coords v3 = m.getColumn(3);
  if (DoubleUtil.isEqual(v3.dotproduct(v), 0.0, Kernel.STANDARD_PRECISION)) {
   projectPlane(m, globalCoords, inPlaneCoords);
   return;
  }
  projectPlane(m.getVx(), m.getVy(), v, m.getOrigin(), globalCoords, inPlaneCoords);
 }
 public void projectPlaneThruVIfPossible(CoordMatrix m, Coords v, Coords globalCoords) {
  Coords v3 = m.getColumn(3);
  if (DoubleUtil.isEqual(v3.dotproduct(v), 0.0, Kernel.STANDARD_PRECISION)) {
   projectPlane(m, globalCoords);
   return;
  }
  projectPlane(m.getVx(), m.getVy(), v, m.getOrigin(), globalCoords);
 }
 public void projectPlaneThruVIfPossible(
   Coords vx, Coords vy, Coords vz, Coords o, Coords v, Coords globalCoords) {
  if (DoubleUtil.isEqual(vz.dotproduct(v), 0.0, Kernel.STANDARD_PRECISION)) {
   projectPlane(vx, vy, vz, o, globalCoords);
   return;
  }
  projectPlane(vx, vy, v, o, globalCoords);
 }
 public void projectPlaneThruVIfPossibleInPlaneCoords(
   CoordMatrix m, Coords v, Coords inPlaneCoords) {
  Coords v3 = m.getColumn(3);
  if (DoubleUtil.isEqual(v3.dotproduct(v), 0.0, Kernel.STANDARD_PRECISION)) {
   projectPlaneInPlaneCoords(m, inPlaneCoords);
   return;
  }
  projectPlaneInPlaneCoords(m.getVx(), m.getVy(), v, m.getOrigin(), inPlaneCoords);
 }
 public void projectPlaneThruVIfPossible(
   CoordMatrix m, Coords oldCoords, Coords v, Coords globalCoords, Coords inPlaneCoords) {
  Coords v3 = m.getColumn(3);
  if (DoubleUtil.isZero(v3.dotproduct(v))) {
   Coords firstProjection = Coords.createInhomCoorsInD3();
   oldCoords.projectLine(this, v, firstProjection, null);
   firstProjection.projectPlane(m, globalCoords, inPlaneCoords);
   return;
  }
  projectPlane(m.getVx(), m.getVy(), v, m.getOrigin(), globalCoords, inPlaneCoords);
 }
 public void projectLine(Coords o, Coords v, Coords h, double[] parameters) {
  this.sub(o, h); 
  Coords N = v.normalized();
  double parameter = h.dotproduct(N); 
  N.mul(parameter, h); 
  o.add(h, h);
  if (parameters == null) {
   return;
  }
  parameters[0] = parameter / v.norm();
  parameters[1] = parameter;
 }
 public void projectLineSub(Coords o, Coords P, Coords H, double[] parameters) {
  this.sub(o, H); 
  Coords V = P.sub(o);
  double vn = V.norm();
  Coords N = V.normalize();
  double parameter = H.dotproduct(N); 
  N.mul(parameter, H); 
  o.add(H, H);
  if (parameters == null) {
   return;
  }
  parameters[0] = parameter / vn;
  parameters[1] = parameter;
 }
 public void projectLine(Coords o, Coords V, Coords H) {
  this.sub(o, H); 
  Coords N = V.normalized();
  double parameter = H.dotproduct(N); 
  N.mul(parameter, H); 
  o.add(H, H);
 }
 public void projectNearLine(Coords o, Coords V, Coords V2, Coords project) {
  Coords V3 = V.crossProduct(V2);
  if (DoubleUtil.isEqual(V3.norm(), 0.0, Kernel.STANDARD_PRECISION)) {
   project.set(this);
   return;
  }
  projectPlane(V, V3, V2, o, project);
 }
 public double projectedParameterOnLineWithDirection(Coords o, Coords V, Coords V2, Coords tmp) {
  Coords V3 = V.crossProduct4(V2);
  if (V3.isZero()) {
   return 0;
  }
  o.projectPlaneInPlaneCoords(V2, V3, V, this, tmp);
  return -tmp.getZ();
 }
 public Coords sub(Coords v) {
  int i;
  Coords result = new Coords(rows);
  for (i = 0; i < rows; i++) {
   result.val[i] = val[i] - v.val[i];
  }
  return result;
 }
 public void sub(Coords v, Coords result) {
  for (int i = 0; i < result.rows; i++) {
   result.val[i] = val[i] - v.val[i];
  }
 }
 public Coords setSub(Coords v1, Coords v2) {
  for (int i = 0; i < rows; i++) {
   val[i] = v1.val[i] - v2.val[i];
  }
  return this;
 }
 public Coords setSub3(Coords v1, Coords v2) {
  for (int i = 0; i < 3; i++) {
   val[i] = v1.val[i] - v2.val[i];
  }
  return this;
 }
 public Coords getInhomCoords() {
  int r = rows;
  Coords result = new Coords(r - 1);
  double wdiv = 1 / val[r - 1];
  for (int i = 0; i < r - 1; i++) {
   result.val[i] = val[i] * wdiv;
  }
  return result;
 }
 public double getInhom(int i) {
  int r = rows;
  double wdiv = 1 / val[r - 1];
  return val[i] * wdiv;
 }
 public Coords setInhomCoords(Coords v) {
  double wdiv = 1 / v.val[rows - 1];
  for (int i = 0; i < rows - 1; i++) {
   val[i] = v.val[i] * wdiv;
  }
  return this;
 }
 public Coords getInhomCoordsInSameDimension() {
  int r = rows;
  if (DoubleUtil.isEqual(val[r - 1], 1)) {
   return this;
  }
  Coords result = new Coords(r);
  double wdiv = 1 / val[r - 1];
  for (int i = 0; i < r - 1; i++) {
   result.val[i] = val[i] * wdiv;
  }
  result.val[r - 1] = 1;
  return result;
 }
 public Coords setInhomCoordsInSameDimension(Coords v) {
  setInhomCoords(v);
  val[rows - 1] = 1;
  return this;
 }
 public void setInhomCoords() {
  if (DoubleUtil.isEqual(val[rows - 1], 1)) {
   return;
  }
  double wdiv = 1 / val[rows - 1];
  for (int i = 0; i < rows - 1; i++) {
   val[i] *= wdiv;
  }
  val[rows - 1] = 1;
 }
 public Coords getCoordsLast1() {
  int len = getLength();
  Coords result = new Coords(len);
  double lastCoord = val[len - 1];
  if (lastCoord != 0.0) {
   double lastCoordInv = 1 / lastCoord;
   for (int i = 0; i < len; i++) {
    result.val[i] = val[i] * lastCoordInv;
   }
  } else {
   result.set(this);
  }
  return result;
 }
 public Coords setCoordsLast1(Coords v) {
  double lastCoord = v.val[rows - 1];
  if (lastCoord != 0.0) {
   double lastCoordInv = 1 / lastCoord;
   for (int i = 0; i < rows; i++) {
    val[i] = v.val[i] * lastCoordInv;
   }
  } else {
   set(v);
  }
  return this;
 }
 public Coords projectInfDim() {
  int len = getLength();
  Coords result = new Coords(len - 1);
  for (int i = 0; i < len - 1; i++) {
   result.val[i] = val[i];
  }
  result.val[len - 2] = val[len - 1];
  return result;
 }
 public Coords setProjectInfDim(Coords v) {
  for (int i = 0; i < v.rows - 1; i++) {
   val[i] = v.val[i];
  }
  val[rows - 2] = v.val[rows - 1];
  return this;
 }
 public boolean equalsForKernel(Coords v, double precision) {
  int len = getLength();
  for (int i = 0; i < len; i++) {
   if (!DoubleUtil.isEqual(val[i], v.val[i], precision)) {
    return false;
   }
  }
  return true;
 }
 public boolean equalsForKernel(Coords v) {
  int len = getLength();
  for (int i = 0; i < len; i++) {
   if (!DoubleUtil.isEqual(val[i], v.val[i])) {
    return false;
   }
  }
  return true;
 }
 public boolean equalsForKernel3(Coords v) {
  for (int i = 0; i < 3; i++) {
   if (!DoubleUtil.isEqual(val[i], v.val[i])) {
    return false;
   }
  }
  return true;
 }
 public boolean isEqual(Coords v) {
  return equalsForKernel(v, Kernel.STANDARD_PRECISION);
 }
 public boolean isZero() {
  int len = getLength();
  for (int i = 0; i < len; i++) {
   if (!DoubleUtil.isEqual(val[i], 0, Kernel.STANDARD_PRECISION)) {
    return false;
   }
  }
  return true;
 }
 public boolean isZero(int dim) {
  for (int i = 0; i < dim; i++) {
   if (!DoubleUtil.isEqual(val[i], 0, Kernel.STANDARD_PRECISION)) {
    return false;
   }
  }
  return true;
 }
 public boolean equalsForKernel(double value, double precision) {
  int len = getLength();
  for (int i = 0; i < len; i++) {
   if (!DoubleUtil.isEqual(this.val[i], value, precision)) {
    return false;
   }
  }
  return true;
 }
 public Coords[] completeOrthonormal() {
  Coords vn1 = new Coords(4);
  if (val[0] != 0) {
   vn1.val[0] = -val[1];
   vn1.val[1] = val[0];
   vn1.normalize();
  } else {
   vn1.val[0] = 1.0;
  }
  Coords vn2 = this.crossProduct4(vn1);
  vn2.normalize();
  return new Coords[] {vn1, vn2};
 }
 public void completeOrthonormal(Coords vn1, Coords vn2) {
  if (val[0] != 0) {
   vn1.val[0] = -val[1];
   vn1.val[1] = val[0];
   vn1.val[2] = 0;
   vn1.val[3] = 0;
   vn1.normalize();
  } else {
   vn1.val[0] = 1.0;
   vn1.val[1] = 0.0;
   vn1.val[2] = 0.0;
   vn1.val[3] = 0.0;
  }
  vn2.setCrossProduct4(this, vn1);
  vn2.setW(0);
  vn2.normalize();
 }
 public void completeOrthonormal3(Coords vn1, Coords vn2) {
  if (val[0] != 0) {
   vn1.val[0] = -val[1];
   vn1.val[1] = val[0];
   vn1.val[2] = 0;
   vn1.normalize();
  } else {
   vn1.val[0] = 1.0;
   vn1.val[1] = 0.0;
   vn1.val[2] = 0.0;
  }
  vn2.setCrossProduct3(this, vn1);
  vn2.normalize();
 }
 public void completeOrthonormal(Coords vn1) {
  if (val[2] != 0) {
   vn1.val[2] = -val[1];
   vn1.val[1] = val[2];
   vn1.val[0] = 0;
   vn1.val[3] = 0;
   vn1.normalize();
  } else {
   vn1.val[0] = 0.0;
   vn1.val[1] = 0.0;
   vn1.val[2] = 1.0;
   vn1.val[3] = 0.0;
  }
 }
 public void completeOrthonormalKeepInXOYPlaneIfPossible(Coords vn1) {
  vn1.val[3] = 0;
  completeOrthonormalKeepInXOYPlaneIfPossible3(vn1);
 }
 public void completeOrthonormalKeepInXOYPlaneIfPossible3(Coords vn1) {
  if (!DoubleUtil.isZero(val[0]) || !DoubleUtil.isZero(val[1])) {
   vn1.val[0] = -val[1];
   vn1.val[1] = val[0];
   vn1.val[2] = 0;
   vn1.normalize();
  } else {
   vn1.val[0] = 1.0;
   vn1.val[1] = 0.0;
   vn1.val[2] = 0.0;
  }
 }
 public Coords add(Coords v) {
  Coords result = new Coords(rows);
  for (int i = 0; i < rows && i < v.rows; i++) {
   result.val[i] = val[i] + v.val[i];
  }
  return result;
 }
 public void add(Coords v, double[] result) {
  for (int i = 0; i < rows; i++) {
   result[i] = val[i] + v.val[i];
  }
 }
 public void add(double[] v, double[] result) {
  for (int i = 0; i < rows; i++) {
   result[i] = val[i] + v[i];
  }
 }
 public Coords addSmaller(Coords v) {
  Coords result = new Coords(rows);
  for (int i = 0; i < v.rows; i++) {
   result.val[i] = val[i] + v.val[i];
  }
  return result;
 }
 public Coords addInside(Coords v) {
  for (int i = 0; i < v.val.length; i++) {
   val[i] += v.val[i];
  }
  return this;
 }
 public Coords addInsideMul(Coords v, double coeff) {
  for (int i = 0; i < v.val.length; i++) {
   val[i] += coeff * v.val[i];
  }
  return this;
 }
 public void addInside(double v) {
  for (int i = 0; i < rows; i++) {
   val[i] += v;
  }
 }
 public Coords mul(double val0) {
  Coords result = new Coords(rows);
  for (int i = 0; i < rows; i++) {
   result.val[i] = val[i] * val0;
  }
  return result;
 }
 public Coords copy() {
  Coords result = new Coords(rows);
  for (int i = 0; i < rows; i++) {
   result.val[i] = val[i];
  }
  return result;
 }
 public void mul(double val0, Coords res) {
  for (int i = 0; i < res.rows && i < rows; i++) {
   res.val[i] = val[i] * val0;
  }
 }
 public Coords setMul(Coords v, double val0) {
  for (int i = 0; i < rows && i < v.rows; i++) {
   val[i] = v.val[i] * val0;
  }
  return this;
 }
 public Coords setMul3(Coords v, double val0) {
  for (int i = 0; i < 3; i++) {
   val[i] = v.val[i] * val0;
  }
  return this;
 }
 public void mul(double val0, double[] res) {
  for (int i = 0; i < res.length && i < rows; i++) {
   res[i] = val[i] * val0;
  }
 }
 public void add(Coords v, Coords res) {
  for (int i = 0; i < res.rows; i++) {
   res.val[i] = v.val[i] + val[i];
  }
 }
 public Coords setAdd(Coords v1, Coords v2) {
  for (int i = 0; i < rows; i++) {
   val[i] = v1.val[i] + v2.val[i];
  }
  return this;
 }
 public Coords setAdd3(Coords v1, Coords v2) {
  for (int i = 0; i < 3; i++) {
   val[i] = v1.val[i] + v2.val[i];
  }
  return this;
 }
 public Coords setBarycenter(Coords... v) {
  double f = 1.0 / v.length;
  for (int i = 0; i < rows; i++) {
   val[i] = 0;
   for (int j = 0; j < v.length; j++) {
    val[i] += v[j].val[i];
   }
   val[i] *= f;
  }
  return this;
 }
 public Coords getCoordsIn2DView() {
  int dim = rows - 1;
  switch (dim) {
   case 2:
    return new Coords(getX(), getY(), getZ());
   case -1:
   case 0:
    return new Coords(0, 0, getX());
   case 1:
    return new Coords(getX(), 0, getY());
   default:
    for (int i = 3; i <= dim; i++) {
     if (Double.isNaN(get(i)) || !DoubleUtil.isZero(get(i))) {
      return new Coords(Double.NaN, Double.NaN, Double.NaN);
     }
    }
    return new Coords(get(1), get(2), get(dim + 1));
  }
 }
 public Coords setCoordsIn2DView(Coords v) {
  int dim = v.rows - 1;
  switch (dim) {
   case 2:
    setX(v.getX());
    setY(v.getY());
    setZ(v.getZ());
    break;
   case -1:
   case 0:
    setX(0);
    setY(0);
    setZ(v.getX());
    break;
   case 1:
    setX(v.getX());
    setY(0);
    setZ(v.getY());
    break;
   default:
    for (int i = 3; i <= dim; i++) {
     if (Double.isNaN(v.get(i)) || !DoubleUtil.isZero(v.get(i))) {
      setX(Double.NaN);
      setY(Double.NaN);
      setZ(Double.NaN);
      return this;
     }
    }
    setX(v.get(1));
    setY(v.get(2));
    setZ(v.get(dim + 1));
  }
  return this;
 }
 public double getGrayScale() {
  return 0.2989 * getX() + 0.5870 * getY() + 0.1140 * getZ();
 }
 public void convertToGrayScale() {
  double gray = getGrayScale();
  setX(gray);
  setY(gray);
  setZ(gray);
 }
 public boolean isPointDefined() {
  if (DoubleUtil.isZero(getW())) {
   return false;
  }
  return isDefined();
 }
 public boolean isDefined() {
  if (val == null) {
   return false;
  }
  for (int i = 0; i < rows; i++) {
   if (Double.isNaN(val[i])) {
    return false;
   }
  }
  return true;
 }
 public void setUndefined() {
  val[0] = Double.NaN;
 }
 public void setPositiveInfinity() {
  for (int i = 0; i < rows; i++) {
   val[i] = Double.POSITIVE_INFINITY;
  }
 }
 public void setNegativeInfinity() {
  for (int i = 0; i < rows; i++) {
   val[i] = Double.NEGATIVE_INFINITY;
  }
 }
 public void get3ForGL(float[] ret) {
  for (int i = 0; i < 3; i++) {
   ret[i] = (float) val[i];
  }
 }
 public void get4ForGL(float[] ret) {
  for (int i = 0; i < 4; i++) {
   ret[i] = (float) val[i];
  }
 }
 public void checkReverseForFirstValuePositive() {
  boolean zero = true;
  int i = 0;
  while (i < val.length && zero) {
   if (!DoubleUtil.isZero(val[i])) {
    zero = false;
   } else {
    i++;
   }
  }
  if (!zero && val[i] < 0) {
   while (i < val.length) {
    val[i] *= -1;
    i++;
   }
  }
 }
 public double[] get() {
  return val;
 }
 public void get(double[] ret) {
  for (int i = 0; i < ret.length; i++) {
   ret[i] = val[i];
  }
 }
 public void get(float[] ret) {
  for (int i = 0; i < ret.length; i++) {
   ret[i] = (float) val[i];
  }
 }
 public boolean isFinite() {
  for (int i = 0; i < rows; i++) {
   if (!Double.isFinite(val[i])) {
    return false;
   }
  }
  return true;
 }
 public Coords mulInside(double v) {
  for (int i = 0; i < val.length; i++) {
   val[i] *= v;
  }
  return this;
 }
 public Coords mulInside3(double v) {
  for (int i = 0; i < 3; i++) {
   val[i] *= v;
  }
  return this;
 }
 public void mulInside(double sx, double sy, double sz) {
  val[0] *= sx;
  val[1] *= sy;
  val[2] *= sz;
 }
 public void setMul(Coords coords, double sx, double sy, double sz) {
  val[0] = coords.val[0] * sx;
  val[1] = coords.val[1] * sy;
  val[2] = coords.val[2] * sz;
 }
 public String toString() {
  StringBuilder s = new StringBuilder("(");
  for (int i = 0; i < val.length; i++) {
   s.append(val[i]);
   s.append(i == val.length - 1 ? ')' : ',');
  }
  return s.toString();
 }
 public String toString(int precision) {
  ScientificFormatAdapter nf = FormatFactory.getPrototype().getScientificFormat(2, 10, false);
  StringBuilder s = new StringBuilder("(");
  for (int i = 0; i < val.length; i++) {
   if (val[i] > 0) {
    s.append('+');
   }
   if (val[i] == 0) {
    s.append("+0.").append(StringUtil.repeat('0', precision));
   } else {
    StringUtil.appendFormat(s, val[i], nf);
   }
   s.append(i == val.length - 1 ? ")" : "  ");
  }
  return s.toString();
 }
 public String toString(int digits, int precision) {
  StringBuilder s = new StringBuilder("(");
  for (int i = 0; i < val.length; i++) {
   StringUtil.toString(val[i], digits, precision, s);
   s.append(i == val.length - 1 ? ")" : "  ");
  }
  return s.toString();
 }
 public Coords setMul(CoordMatrix m, Coords v) {
  for (int i = 1; i <= getLength(); i++) {
   double r = 0;
   for (int n = 1; n <= m.getColumns(); n++) {
    r += m.get(i, n) * v.get(n);
   }
   set(i, r);
  }
  return this;
 }
 public Coords setMul3(CoordMatrix m, Coords v) {
  for (int i = 1; i <= 3; i++) {
   double r = 0;
   for (int n = 1; n <= m.getColumns(); n++) {
    r += m.get(i, n) * v.get(n);
   }
   set(i, r);
  }
  return this;
 }
 public Coords setMul(CoordMatrix m, double[] v) {
  for (int i = 1; i <= getLength(); i++) {
   double r = 0;
   for (int j = 0; j < v.length; j++) {
    r += m.get(i, j + 1) * v[j];
   }
   set(i, r);
  }
  return this;
 }
 public Coords setMulPoint(CoordMatrix m, double x, double y, double z) {
  for (int i = 1; i <= getLength(); i++) {
   set(i, m.get(i, 1) * x + m.get(i, 2) * y + m.get(i, 3) * z + m.get(i, 4));
  }
  return this;
 }
 public boolean isNotFinalUndefined() {
  return true;
 }
 public boolean isFinalUndefined() {
  return false;
 }
 public void set(double param1, double param2, MyPoint leftPoint, MyPoint rightPoint) {
  val[0] = param2 * leftPoint.x + param1 * rightPoint.x;
  val[1] = param2 * leftPoint.y + param1 * rightPoint.y;
  val[2] = 1.0;
 }
 public void setAnimatableValue(Coords other) {
  set3(other);
 }
 public boolean equalsForAnimation(Coords other) {
  boolean neg = false;
  boolean negSet = false;
  for (int i = 0; i < 3; i++) {
   if (negSet) {
    if (neg) {
     if (!DoubleUtil.isEqual(val[i], -other.val[i])) {
      return false;
     }
    } else {
     if (!DoubleUtil.isEqual(val[i], other.val[i])) {
      return false;
     }
    }
   } else {
    if (DoubleUtil.isEqual(val[i], 0) && DoubleUtil.isEqual(other.val[i], 0)) {
     negSet = false;
    } else if (DoubleUtil.isEqual(val[i], other.val[i])) {
     neg = false;
     negSet = true;
    } else if (DoubleUtil.isEqual(val[i], -other.val[i])) {
     neg = true;
     negSet = true;
    } else {
     return false;
    }
   }
  }
  return true;
 }
}
```

### FILE: kernel/matrix/Coords3.java
```java
public abstract class Coords3 {
 public abstract void set(float x, float y, float z);
 public abstract void set(double x, double y, double z);
 public abstract boolean isDefined();
 public boolean isNotFinalUndefined() {
  return true;
 }
 public boolean isFinalUndefined() {
  return false;
 }
 public abstract Coords3 copyVector();
 public abstract void addInside(Coords3 v);
 public abstract void mulInside(float v);
 public abstract void mulInside(double v);
 public abstract void mulInside(double a, double b, double c);
 public abstract void normalizeIfPossible();
 public final void setNormalizedIfPossible(Coords v) {
  double vx = v.getX();
  double vy = v.getY();
  double vz = v.getZ();
  double f = 1 / Math.sqrt(vx * vx + vy * vy + vz * vz);
  if (Double.isNaN(f)) {
   set(0, 0, 0);
  } else {
   set(vx * f, vy * f, vz * f);
  }
 }
 public abstract double getXd();
 public abstract double getYd();
 public abstract double getZd();
 public abstract float getXf();
 public abstract float getYf();
 public abstract float getZf();
}
```

### FILE: kernel/matrix/CoordsDouble3.java
```java
public class CoordsDouble3 extends Coords3 {
 public static final Coords3 UNDEFINED = new CoordsDouble3(0f, 0f, 0f) {
  public boolean isNotFinalUndefined() {
   return false;
  }
  public boolean isFinalUndefined() {
   return true;
  }
 };
 public double x;
 public double y;
 public double z;
 public CoordsDouble3() {}
 public CoordsDouble3(double x, double y, double z) {
  this.x = x;
  this.y = y;
  this.z = z;
 }
 public final boolean isDefined() {
  return !Double.isNaN(x) && !Double.isNaN(y) && !Double.isNaN(z);
 }
 public final CoordsDouble3 copyVector() {
  return new CoordsDouble3(x, y, z);
 }
 public final void addInside(Coords3 v) {
  x += v.getXd();
  y += v.getYd();
  z += v.getZd();
 }
 public final void mulInside(float v) {
  x *= v;
  y *= v;
  z *= v;
 }
 public final void mulInside(double v) {
  x *= v;
  y *= v;
  z *= v;
 }
 public void normalizeIfPossible() {
  double l = Math.sqrt(x * x + y * y + z * z);
  if (!DoubleUtil.isZero(l)) {
   mulInside(1 / l);
  }
 }
 public final void set(float x, float y, float z) {
  this.x = x;
  this.y = y;
  this.z = z;
 }
 public final void set(double x, double y, double z) {
  this.x = x;
  this.y = y;
  this.z = z;
 }
 public final double getXd() {
  return x;
 }
 public final double getYd() {
  return y;
 }
 public final double getZd() {
  return z;
 }
 public final float getXf() {
  return (float) x;
 }
 public final float getYf() {
  return (float) y;
 }
 public final float getZf() {
  return (float) z;
 }
 public String toString() {
  StringBuilder ret = new StringBuilder();
  ret.append(x);
  ret.append(',');
  ret.append(y);
  ret.append(',');
  ret.append(z);
  return ret.toString();
 }
 public void mulInside(double a, double b, double c) {
  x *= a;
  y *= b;
  z *= c;
 }
}
```

### FILE: kernel/matrix/Quaternion.java
```java
public class Quaternion {
 private double x;
 private double y;
 private double z;
 private double w;
 public Quaternion(double x, double y, double z, double w) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
 }
 public Quaternion() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.w = 0;
 }
 public Quaternion(double rotX, double rotZ) {
  double cx = Math.cos(rotX / 2);
  double cz = Math.cos(rotZ / 2);
  double sx = Math.sin(rotX / 2);
  double sz = Math.sin(rotZ / 2);
  w = cx * cz;
  x = sx * cz;
  y = sx * sz;
  z = cx * sz;
 }
 public void set(double[] values) {
  this.x = values[0];
  this.y = values[1];
  this.z = values[2];
  this.w = values[3];
 }
 public void set(Quaternion q) {
  this.x = q.x;
  this.y = q.y;
  this.z = q.z;
  this.w = q.w;
 }
 public Quaternion inverse() {
  double norm2 = x * x + y * y + z * z + w * w;
  return new Quaternion(-x / norm2, -y / norm2, -z / norm2, w / norm2);
 }
 public Quaternion multiply(Quaternion q) {
  double mx = w * q.x + x * q.w + y * q.z - z * q.y;
  double my = w * q.y - x * q.z + y * q.w + z * q.x;
  double mz = w * q.z + x * q.y - y * q.x + z * q.w;
  double mw = w * q.w - x * q.x - y * q.y - z * q.z;
  return new Quaternion(mx, my, mz, mw);
 }
 public Quaternion leftDivide(Quaternion q) {
  return this.inverse().multiply(q);
 }
 public double getAngleX() {
  return Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
 }
 public double getAngleY() {
  return Math.asin(2 * (w * y - z * x));
 }
 public double getAngleZ() {
  return Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));
 }
 public String toString() {
  return "v=(" + x + "," + y + "," + z + ")  scalar=" + w;
 }
 public CoordMatrix getRotMatrix() {
  CoordMatrix ret = new CoordMatrix(3, 3);
  ret.set(1, 1, 1 - 2 * (y * y + z * z));
  ret.set(1, 2, 2 * (x * y - w * z));
  ret.set(1, 3, 2 * (w * y + x * z));
  ret.set(2, 1, 2 * (x * y + w * z));
  ret.set(2, 2, 1 - 2 * (x * x + z * z));
  ret.set(2, 3, 2 * (y * z - w * x));
  ret.set(3, 1, 2 * (x * z - w * y));
  ret.set(3, 2, 2 * (y * z + w * x));
  ret.set(3, 3, 1 - 2 * (x * x + y * y));
  return ret;
 }
 public Coords getVector() {
  return new Coords(x, y, z);
 }
 public double getScalar() {
  return w;
 }
 public void setVector(Coords v) {
  x = v.getX();
  y = v.getY();
  z = v.getZ();
 }
 public void setUndefined() {
  x = Double.NaN;
 }
 public boolean isDefined() {
  return Double.isNaN(x);
 }
 public double distance(Quaternion q) {
  double norm2 = x * x + y * y + z * z + w * w;
  double qnorm2 = q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w;
  double dot = x * q.x + y * q.y + z * q.z + w * q.w;
  return 1 - dot * dot / (norm2 * qnorm2);
 }
}
```
