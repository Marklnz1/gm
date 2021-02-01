class Direccion {
  /*static char[] drcNumericoAchar;
	private static int[] drcCharAnumerico;
	private static char[] drcPuntoAchar;
	private static int[] drcPuntoAnumerico;
	private static Point[] drcNumericoApunto;
	private static Point[] drcCharApunto;
	private static Direccion d = new Direccion();
	public Direccion() {
		cargarNumericoAchar();
		cargarCharAint();
		cargarPuntoAchar();
		cargarPuntoAint();
		cargarNumericoApunto();
		cargarCharApunto();
	}
	public char getDireccionTeclado() {
		if(GestorControles.teclado.isPressed(KeyEvent.VK_UP)) {
			return 'n';
		}else if(GestorControles.teclado.isPressed(KeyEvent.VK_DOWN)) {
			return 's';
		}else if(GestorControles.teclado.isPressed(KeyEvent.VK_LEFT)) {
			return 'o';
		}else if(GestorControles.teclado.isPressed(KeyEvent.VK_RIGHT)) {
			return 'e';
		}
		return '?';
	}
	private void cargarNumericoAchar() {
		drcNumericoAchar = new char[8];
		drcNumericoAchar[0] = 'n';
		drcNumericoAchar[1] = '2';
		drcNumericoAchar[2] = 'e';
		drcNumericoAchar[3] = '3';
		drcNumericoAchar[4] = 's';
		drcNumericoAchar[5] = '4';
		drcNumericoAchar[6] = 'o';
		drcNumericoAchar[7] = '1';
	}
	
	private void cargarPuntoAchar() {
		drcPuntoAchar = new char[23];
		drcPuntoAchar[2] = '1';
		drcPuntoAchar[12] = 'n';
		drcPuntoAchar[22] = '2';
		drcPuntoAchar[1] = 'o';
		drcPuntoAchar[0] = '4';
		drcPuntoAchar[10] = 's';
		drcPuntoAchar[20] = '3';
		drcPuntoAchar[21] = 'e';
	}
	private void cargarPuntoAint() {
		drcPuntoAnumerico = new int[23];
		drcPuntoAnumerico[2] = 7;
		drcPuntoAnumerico[12] = 0;
		drcPuntoAnumerico[22] = 1;
		drcPuntoAnumerico[1] = 6;
		drcPuntoAnumerico[0] = 5;
		drcPuntoAnumerico[10] = 4;
		drcPuntoAnumerico[20] = 3;
		drcPuntoAnumerico[21] = 2;
	}
	private void cargarNumericoApunto() {
		drcNumericoApunto = new Point[8];
		drcNumericoApunto[0] = new Point(0,1);
		drcNumericoApunto[1] = new Point(1,1);
		drcNumericoApunto[2] = new Point(1,0);
		drcNumericoApunto[3] = new Point(1,-1);
		drcNumericoApunto[4] = new Point(0,-1);
		drcNumericoApunto[5] = new Point(-1,-1);
		drcNumericoApunto[6] = new Point(-1,0);
		drcNumericoApunto[7] = new Point(-1,1);
	}
	private void cargarCharAint() {
		drcCharAnumerico = new int[67];
		drcCharAnumerico[52] = 2;
		drcCharAnumerico[62] = 6;
		drcCharAnumerico[61] = 0;
		drcCharAnumerico[66] = 4;
		drcCharAnumerico[0] = 7;
		drcCharAnumerico[1] = 1;
		drcCharAnumerico[2] = 3;
		drcCharAnumerico[3] = 5;
	}
	private void cargarCharApunto() {
		drcCharApunto = new Point[67];
		drcCharApunto[61] = new Point(0,1);
		drcCharApunto[1] = new Point(1,1);
		drcCharApunto[52] = new Point(1,0);
		drcCharApunto[2] = new Point(1,-1);
		drcCharApunto[66] = new Point(0,-1);
		drcCharApunto[3] = new Point(-1,-1);
		drcCharApunto[62] = new Point(-1,0);
		drcCharApunto[0] = new Point(-1,1);
    }*/
  /*
	static convertToChar(direccionNumerica) {
        switch (direcc) {
            case value:
                
                break;
        
            default:
                break;
        }
		return drcNumericoAchar[direccionNumerica];
	}
	public static int convertToInt(char direccion) {
		return drcCharAnumerico[direccion-49];
	}
	public static char convertToChar(int drcX,int drcY) {
		return drcPuntoAchar[(drcX+1)*10+drcY+1];
	}
	public static int convertToInt(int drcX,int drcY) {
		return drcPuntoAnumerico[(drcX+1)*10+drcY+1];
	}
	public static int convertToInt(Point point) {
		return convertToInt(point.x, point.y);
	}
	public static Point[] separarComponentes(Point point) {
		return new Point[] {new Point(point.x,0),new Point(0,point.y)};
	}
	public static char convertToChar(Point point) {
		return convertToChar(point.x, point.y);
	}
	public static Point convertToPoint(int direccionNumerica) {
		return (Point)drcNumericoApunto[direccionNumerica].clone();
	}*/
  static convertPointToInt(x, y) {
    let cadena = "" + x + y;
    switch (cadena) {
      case "0-1":
        return 0;
      case "1-1":
        return 1;
      case "10":
        return 2;
      case "11":
        return 3;
      case "01":
        return 4;
      case "-11":
        return 5;
      case "-10":
        return 6;
      case "-1-1":
        return 7;

      default:
        return '?';
    }
  }
  static convertIntToPoint(direccionNumerica) {
    switch (direccionNumerica) {
      case 0:
        return new Point(0, 1);
      case 1:
        return new Point(1, 1);
      case 2:
        return new Point(1, 0);
      case 3:
        return new Point(1, -1);
      case 4:
        return new Point(0, -1);
      case 5:
        return new Point(-1, -1);
      case 6:
        return new Point(-1, 0);
      case 7:
        return new Point(-1, 1);
    }
    return null;
  }
  /*
	public static int invertirDireccionInt(int dirNumerica) {
		return (dirNumerica+4)%8;
    }
    */
}
