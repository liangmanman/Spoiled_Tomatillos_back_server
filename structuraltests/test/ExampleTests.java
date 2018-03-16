import org.junit.Test;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import static org.junit.Assert.assertEquals;


public class ExampleTests {

    Example e1 = new Example();

    @Test
    public void testConvertValueToInt1() {
        assertEquals(e1.consolidateSpace("jojo    jiji"), "jojo jiji");
    }

    @Test
    public void testConvertValueToInt2() {
        assertEquals(e1.consolidateSpace(""), "");
    }

    @Test
    public void testConvertValueToInt3() {
        assertEquals(e1.consolidateSpace("jojojiji"), "jojojiji");
    }

//    @Test
//    public void testConvertValueToInt4() {
//        assertEquals(e1.consolidateSpace("      "), " ");
//    }

    @Test
    public void testConvertValueToInt5() {
        assertEquals(e1.consolidateSpace("jojo jiji"), "jojo jiji");
    }

    @Test
    public void properTwoInput() throws IllegalArgumentException {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outContent));
        Example.main(new String[] {"jojo jiji"});
        assertEquals("Input: Hello there buddy\n" +
                "Output: Hello there buddy\n",outContent.toString());
    }

}
