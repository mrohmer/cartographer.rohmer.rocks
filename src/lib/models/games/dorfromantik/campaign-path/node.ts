import type {DorfromantikCampaignPathAchievement} from '../achievement';
import {DorfromantikBoxAchievement} from '../achievement';

export interface Node {
  readonly checkbox: boolean;
  readonly unlocks: DorfromantikCampaignPathAchievement|DorfromantikBoxAchievement.RED_HEART|undefined;

  getEdges(): Edge[];
  addEdge(edge: Edge): Node;
}

export class Edge {
  private nodes: [Node, Node]|undefined;
  private weight: number = 2;

  setNodes(node1: Node, node2: Node): Edge {
    this.nodes = [node1, node2];
    return this;
  }
  getOtherNode(node: Node): Node|undefined {
    return this.nodes?.find(n => n === node);
  }

  setWeight(weight: number): Edge {
    this.weight = weight ?? 2;
    return this;
  }
  getWeight(): number {
    return this.weight ?? 2;
  }
}

abstract class AbstractNode implements Node {
  readonly abstract checkbox: boolean;

  protected edges: Edge[]|undefined = undefined;

  constructor(public readonly unlocks: DorfromantikCampaignPathAchievement | DorfromantikBoxAchievement.RED_HEART | undefined) {
  }
  getEdges(): Edge[] {
    return this.edges ?? [];
  }
  addEdge(edge: Edge): Node {
    this.edges = this.edges ?? [];
    this.edges.push(edge);
    return this;
  }
}
export class HeartNode extends AbstractNode {
  readonly checkbox = true;
  constructor() {
    super(DorfromantikBoxAchievement.RED_HEART);
  }
}

export class BoxNode extends AbstractNode {
  readonly checkbox = false;
}
export class StartNode extends AbstractNode {
  readonly checkbox = false;
  constructor() {
    super(undefined);
  }
}
